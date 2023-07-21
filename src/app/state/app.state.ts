import { CategoriesState } from "./categories/categories.reducer";
import { PaymentMethodsState } from "./payment-methods/payment-methods.reducer";
import { TagsState } from "./tags/tags.reducer";
import { TransactionsState } from "./transactions/transactions.reducer";
import { VendorsState } from "./vendors/vendors.reducer";

export interface AppState {
    categories: CategoriesState;
    paymentMethods: PaymentMethodsState;
    vendors: VendorsState;
    tags: TagsState;
    transactions: TransactionsState;
}
