import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

//Components
import { CategoriesComponent } from "./components/categories/categories.component";

//Services
import { CategoriesService } from "./services/categories.service";

//Angular Material
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";

@NgModule({
    declarations: [CategoriesComponent],
    imports: [CommonModule, HttpClientModule, MatTableModule, MatPaginatorModule, MatSortModule],
    providers: [CategoriesService],
})
export class CategoriesModule {}
