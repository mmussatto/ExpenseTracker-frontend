import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from "./views/categories/components/categories/categories.component";
import { NotImplementedComponent } from "./components/not-implemented/not-implemented.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
    },
    {
        path: "transactions",
        component: NotImplementedComponent,
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
    {
        path: "**",
        redirectTo: "",
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
