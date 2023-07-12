import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

//Components
import { CategoriesComponent } from "./components/categories/categories.component";
import { NewCategoryComponent } from "./components/new-category/new-category.component";

//Services
import { CategoriesService } from "./services/categories.service";

//Angular Material
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";

const ROUTES: Routes = [{ path: "new", component: NewCategoryComponent }];

@NgModule({
    declarations: [CategoriesComponent, NewCategoryComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(ROUTES),
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatIconModule,
    ],
    providers: [CategoriesService],
    exports: [RouterModule],
})
export class CategoriesModule {}
