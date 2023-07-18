import { Component, OnInit, ViewChild } from "@angular/core";
import { CategoriesService } from "../../services/categories.service";
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Transaction } from "src/app/models/transaction.model";

@Component({
    selector: "app-category-transactions",
    templateUrl: "./category-transactions.component.html",
    styleUrls: ["./category-transactions.component.css"],
})
export class CategoryTransactionsComponent implements OnInit {
    //Table columns
    displayedColumns: string[] = [
        "id",
        "date",
        "amount",
        "description",
        "category",
        "paymentMethod",
        "vendor",
        "tags",
    ];
    dataSource = new MatTableDataSource<Transaction>([]);

    //Sort and paginator
    @ViewChild(MatSort) sort?: MatSort | null;
    @ViewChild(MatPaginator) paginator?: MatPaginator;

    id = Number(this.route.snapshot.paramMap.get("id"));

    constructor(
        private route: ActivatedRoute,
        private categoriesService: CategoriesService,
        private _liveAnnouncer: LiveAnnouncer
    ) {}

    ngOnInit(): void {
        this.categoriesService.getCategoryTransactions(this.id).subscribe((transactions) => {
            console.log(transactions);

            this.refreshDataSource(transactions);
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

    /** Refresh the dataSource and update the paginator and sort  */
    private refreshDataSource(transactions: Transaction[]) {
        this.dataSource = new MatTableDataSource(transactions);

        this.dataSource.paginator = this.paginator ?? null;
        this.dataSource.sort = this.sort ?? null;
    }
}
