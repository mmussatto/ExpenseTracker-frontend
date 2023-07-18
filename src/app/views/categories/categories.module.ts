import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

//Components
import { CategoriesComponent } from "./components/categories/categories.component";
import { NewCategoryComponent } from "./components/new-category/new-category.component";
import { UpdateCategoryComponent } from "./components/update-category/update-category.component";
import { CategoryTransactionsComponent } from "./components/category-transactions/category-transactions.component";

//Services
import { CategoriesService } from "./services/categories.service";

//Angular Material
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";

const ROUTES: Routes = [
    {
        path: "categories",
        children: [
            { path: ":id/update", component: UpdateCategoryComponent },
            { path: ":id/transactions", component: CategoryTransactionsComponent },
            { path: "new", component: NewCategoryComponent },
        ],
    },
];

@NgModule({
    declarations: [CategoriesComponent, NewCategoryComponent, UpdateCategoryComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
    ],
    providers: [CategoriesService],
    exports: [RouterModule],
})
export class CategoriesModule {}
