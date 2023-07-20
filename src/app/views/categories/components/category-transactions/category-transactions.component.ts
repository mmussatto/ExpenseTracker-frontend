import { Component, OnInit, ViewChild } from "@angular/core";
import { CategoriesService } from "../../services/categories.service";
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Transaction } from "src/app/models/transaction.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/state/app.state";
import { selectCategoryById } from "src/app/state/categories/categories.selectors";

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
        "category.name",
        "paymentMethod.name",
        "vendor.name",
        "tags.name",
    ];
    dataSource = new MatTableDataSource<Transaction>([]);

    //Sort and paginator
    @ViewChild(MatSort) sort?: MatSort | null;
    @ViewChild(MatPaginator) paginator?: MatPaginator;

    //Category's id
    id = Number(this.route.snapshot.paramMap.get("id"));

    //Flags
    hasTransactions: boolean = true;

    //Categories from the store
    category$ = this.store.select(selectCategoryById(this.id));

    //Total amount
    totalAmount = 0;

    constructor(
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private categoriesService: CategoriesService,
        private _liveAnnouncer: LiveAnnouncer
    ) {}

    ngOnInit(): void {
        this.categoriesService.getCategoryTransactions(this.id).subscribe((transactions) => {
            console.log(`[Category ${this.id} Transactions]`, transactions);

            if (transactions.length === 0) {
                this.hasTransactions = false;
            } else {
                this.refreshDataSource(transactions);
                this.calculateTotalAmount(transactions);
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

    private calculateTotalAmount(transactions: Transaction[]) {
        this.totalAmount = transactions.reduce((preVal, currVal) => preVal + currVal.amount, 0);
    }

    /** Refresh the dataSource and update the paginator and sort  */
    private refreshDataSource(transactions: Transaction[]) {
        this.dataSource = new MatTableDataSource(transactions);

        this.dataSource.paginator = this.paginator ?? null;

        //Custom sorting for transactions property name
        this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
                case "paymentMethod.name": {
                    return item.paymentMethod.name;
                }
                case "vendor.name": {
                    return item.vendor.name;
                }
                default: {
                    return item[property as keyof Transaction]?.toString() || "";
                }
            }
        };

        this.dataSource.sort = this.sort ?? null;
    }
}
