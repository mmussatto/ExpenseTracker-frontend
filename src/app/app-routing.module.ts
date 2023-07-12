import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from "./views/categories/components/categories/categories.component";

const routes: Routes = [
    // {
    //     path: "transactions",
    // },
    {
        path: "categories",
        component: CategoriesComponent,
    },
    // {
    //     path: "payment-methods",
    // },
    // {
    //     path: "vendors",
    // },
    // {
    //     path: "tags",
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
