import { LiveAnnouncer } from "@angular/cdk/a11y";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { deleteCategory, getCategories } from "src/app/state/categories/categories.actions";
import {
    selectAllCategories,
    selectCategoriesState,
} from "src/app/state/categories/categories.selectors";
import { AppState } from "src/app/state/app.state";
import { Category } from "src/app/models/category.model";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/templates/dialogs/confirm-dialog/confirm-dialog.component";

@Component({
    selector: "app-categories",
    templateUrl: "./categories.component.html",
    styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent implements OnInit, AfterViewInit {
    //Table columns
    displayedColumns: string[] = ["id", "name", "color", "actions"];
    dataSource = new MatTableDataSource<Category>([]);

    //Categories from the store
    categories$ = this.store.select(selectAllCategories);

    //Sort and paginator
    @ViewChild(MatSort) sort?: MatSort | null;
    @ViewChild(MatPaginator) paginator?: MatPaginator;

    serverError: boolean = false;

    constructor(
        private store: Store<AppState>,
        private _liveAnnouncer: LiveAnnouncer,
        private dialog: MatDialog
    ) {}

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort ?? null;
        this.dataSource.paginator = this.paginator ?? null;
    }

    ngOnInit(): void {
        this.store.dispatch(getCategories());

        this.categories$.subscribe((categories) => {
            this.dataSource = new MatTableDataSource(categories);
            //Set sort and paginator here because sometimes afterViewInit will run before categories$ has received the values
            //in that case, the attribution to dataSource will erase the sort and paginator
            this.dataSource.sort = this.sort ?? null;
            this.dataSource.paginator = this.paginator ?? null;
        });

        this.store.select(selectCategoriesState).subscribe((state) => {
            if (state.status === "ERROR" && state.error === "Server Error") {
                this.serverError = true;
            } else {
                this.serverError = false;
            }
        });
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        // This example uses English messages. If your application supports
        // multiple language, you would internationalize these strings.
        // Furthermore, you can customize the message to add additional
        // details about the values being sorted.
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce("Sorting cleared");
        }
    }

    deleteCategory(id: number) {
        this.store.dispatch(deleteCategory({ id: id }));
    }

    openConfirmDeleteDialog(id: number): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { info: "Delete category?" },
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
            if (result === true) {
                this.deleteCategory(id);
            }
        });
    }
}
