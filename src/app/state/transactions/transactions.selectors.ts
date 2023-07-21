import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { TransactionsState } from "./transactions.reducer";

export const selectTransactionsState = (state: AppState) => state.transactions;

export const selectAllTransactions = createSelector(
    selectTransactionsState,
    (state: TransactionsState) => state.transactions
);

export const selectPaymentMethodById = (id: number) =>
    createSelector(selectTransactionsState, (state: TransactionsState) => {
        return state.transactions.find((transaction) => transaction.id === id);
    });
