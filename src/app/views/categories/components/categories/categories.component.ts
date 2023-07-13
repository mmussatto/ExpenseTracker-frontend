import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CategoriesService, Category } from "../../services/categories.service";

@Component({
    selector: "app-categories",
    templateUrl: "./categories.component.html",
    styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent implements OnInit {
    displayedColumns: string[] = ["id", "name", "color", "actions"];

    categories: Category[] = [];

    dataSource = new MatTableDataSource(this.categories);

    constructor(
        private categoriesService: CategoriesService,
        private _liveAnnouncer: LiveAnnouncer
    ) {}

    ngOnInit(): void {
        this.categoriesService.findAllCategories().subscribe((response) => {
            this.categories = response;
            console.log(response);
            this.dataSource = new MatTableDataSource(this.categories);

            this.dataSource.paginator = this.paginator ?? null;
            this.dataSource.sort = this.sort ?? null;
        });
    }

    @ViewChild(MatSort) sort?: MatSort | null;

    @ViewChild(MatPaginator) paginator?: MatPaginator;

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
        this.categoriesService.deleteCategory(id).subscribe(() => {
            this.categories = this.categories.filter((c) => c.id !== id);
            this.refreshDataSource();
        });
    }

}
