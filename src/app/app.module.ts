import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//Templates
import { ConfirmDialogComponent } from "./templates/dialogs/confirm-dialog/confirm-dialog.component";

//App components
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NavComponent } from "./components/nav/nav.component";
import { NotImplementedComponent } from "./components/not-implemented/not-implemented.component";
import { HomeComponent } from "./components/home/home.component";

//View modules
import { CategoriesModule } from "./views/categories/categories.module";
import { PaymentMethodsModule } from "./views/payment-methods/payment-methods.module";
import { VendorsModule } from "./views/vendors/vendors.module";
import { TagsModule } from "./views/tags/tags.module";
import { TransactionsModule } from "./views/transactions/transactions.module";

//Store
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { categoriesReducer } from "./state/categories/categories.reducer";
import { CategoriesEffects } from "./state/categories/categories.effects";
import { paymentMethodsReducer } from "./state/payment-methods/payment-methods.reducer";
import { PaymentMethodsEffects } from "./state/payment-methods/payment-methods.effects";
import { vendorReducer } from "./state/vendors/vendors.reducer";
import { VendorsEffects } from "./state/vendors/vendors.effects";
import { TagsEffects } from "./state/tags/tags.effects";
import { tagsReducer } from "./state/tags/tags.reducer";
import { transactionsReducer } from "./state/transactions/transactions.reducer";
import { TransactionsEffects } from "./state/transactions/transactions.effects";

//Angular Material
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent,
        ConfirmDialogComponent,
        NotImplementedComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CategoriesModule,
        PaymentMethodsModule,
        VendorsModule,
        TagsModule,
        TransactionsModule,
        AppRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatDialogModule,
        MatSnackBarModule,
        StoreModule.forRoot({
            categories: categoriesReducer,
            paymentMethods: paymentMethodsReducer,
            vendors: vendorReducer,
            tags: tagsReducer,
            transactions: transactionsReducer,
        }),
        EffectsModule.forRoot([
            CategoriesEffects,
            PaymentMethodsEffects,
            VendorsEffects,
            TagsEffects,
            TransactionsEffects,
        ]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
