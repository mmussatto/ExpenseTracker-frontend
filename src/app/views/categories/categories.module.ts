import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

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

@NgModule({
    declarations: [CategoriesComponent, NewCategoryComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
    ],
    providers: [CategoriesService],
})
export class CategoriesModule {}
