import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

//Components
import { CategoriesComponent } from "./components/categories/categories.component";

//Angular Material
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";

@NgModule({
    declarations: [CategoriesComponent],
    imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
})
export class CategoriesModule {}
