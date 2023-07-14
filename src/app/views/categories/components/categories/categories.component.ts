import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { deleteCategory, loadCategories } from "src/app/state/categories/categories.actions";
import { selectAllCategories } from "src/app/state/categories/categories.selectors";
import { AppState } from "src/app/state/app.state";
import { Category } from "src/app/models/category.model";

@Component({
    selector: "app-categories",
    templateUrl: "./categories.component.html",
    styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent implements OnInit {
    //Table columns
    displayedColumns: string[] = ["id", "name", "color", "actions"];
    dataSource = new MatTableDataSource<Category>([]);

    //Categories from the store
    categories$ = this.store.select(selectAllCategories);

    //Sort and paginator
    @ViewChild(MatSort) sort?: MatSort | null;
    @ViewChild(MatPaginator) paginator?: MatPaginator;

    constructor(private store: Store<AppState>, private _liveAnnouncer: LiveAnnouncer) {}

    ngOnInit(): void {
        this.store.dispatch(loadCategories());

        this.categories$.subscribe((x) => {
            console.log("Subscribe on init", x);
            this.refreshDataSource(x);
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
        this.store.dispatch(deleteCategory({ id: 26 }));
    }

    /** Refresh the dataSource and update the paginator and sort  */
    private refreshDataSource(categories: Category[]) {
        this.dataSource = new MatTableDataSource(categories);

        this.dataSource.paginator = this.paginator ?? null;
        this.dataSource.sort = this.sort ?? null;
    }
}
