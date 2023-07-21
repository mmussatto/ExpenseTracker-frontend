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

//Store
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { categoriesReducer } from "./state/categories/categories.reducer";
import { CategoriesEffects } from "./state/categories/categories.effects";
import { paymentMethodsReducer } from "./state/payment-methods/payment-methods.reducer";
// import {PaymentMethodsEffects}
import { vendorReducer } from "./state/vendors/vendors.reducer";
import { tagsReducer } from "./state/tags/tags.reducer";

//Angular Material
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { PaymentMethodsEffects } from "./state/payment-methods/payment-methods.effects";
import { VendorsEffects } from "./state/vendors/vendors.effects";
import { TagsEffects } from "./state/tags/tags.effects";

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
        }),
        EffectsModule.forRoot([
            CategoriesEffects,
            PaymentMethodsEffects,
            VendorsEffects,
            TagsEffects,
        ]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
