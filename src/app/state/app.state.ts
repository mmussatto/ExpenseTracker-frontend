import { CategoriesState } from "./categories/categories.reducer";
import { PaymentMethodsState } from "./payment-methods/payment-methods.reducer";

export interface AppState {
    categories: CategoriesState;
    paymentMethods: PaymentMethodsState;
}
