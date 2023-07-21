import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { PaymentMethodsState } from "./payment-methods.reducer";

export const selectPaymentMethodsState = (state: AppState) => state.paymentMethods;

export const selectAllPaymentMethods = createSelector(
    selectPaymentMethodsState,
    (state: PaymentMethodsState) => state.paymentMethods
);

export const selectPaymentMethodById = (id: number) =>
    createSelector(selectPaymentMethodsState, (state: PaymentMethodsState) => {
        return state.paymentMethods.find((paymentMethod) => paymentMethod.id === id);
    });
