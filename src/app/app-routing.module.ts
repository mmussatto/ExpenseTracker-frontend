import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from "./views/categories/components/categories/categories.component";
import { NotImplementedComponent } from "./components/not-implemented/not-implemented.component";

const routes: Routes = [
    {
        path: "transactions",
        component: NotImplementedComponent,
    },
    {
        path: "categories",
        component: CategoriesComponent,
    },
    {
        path: "payment-methods",
        component: NotImplementedComponent,
    },
    {
        path: "vendors",
        component: NotImplementedComponent,
    },
    {
        path: "tags",
        component: NotImplementedComponent,
    },
    {
        path: "not-implemented",
        component: NotImplementedComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
