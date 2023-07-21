import { createReducer, on } from "@ngrx/store";
import { Transaction } from "src/app/models/transaction.model";
import {
    createTransaction,
    createTransactionFail,
    createTransactionSuccess,
    deleteTransaction,
    deleteTransactionFail,
    deleteTransactionSuccess,
    loadTransactions,
    loadTransactionsFail,
    loadTransactionsSuccess,
    updateTransaction,
    updateTransactionFail,
    updateTransactionSuccess,
} from "./transactions.actions";

/** Transactions State */
export interface TransactionsState {
    transactions: Transaction[];
    error: string | null;
    status: "NOT_LOADED" | "LOADING" | "LOADED" | "ERROR" | "PENDING";
}

export const initialState: TransactionsState = {
    transactions: [],
    error: null,
    status: "NOT_LOADED",
};

export const transactionsReducer = createReducer(
    initialState,

    /* -------- Loading ---------- */
    on(loadTransactions, (state) => ({ ...state, status: "LOADING" as const })),

    on(loadTransactionsSuccess, (state, { transactions }) => ({
        ...state,
        transactions: transactions,
        error: null,
        status: "LOADED" as const,
    })),

    on(loadTransactionsFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    })),

    /* -------- Creating ---------- */
    on(createTransaction, (state) => ({ ...state, status: "PENDING" as const })),

    on(createTransactionSuccess, (state, { transaction }) => ({
        ...state,
        transactions: [...state.transactions, { ...transaction }],
        error: null,
        status: "LOADED" as const,
    })),

    on(createTransactionFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    })),

    /* -------- Updating ---------- */
    on(updateTransaction, (state) => ({ ...state, status: "PENDING" as const })),

    on(updateTransactionSuccess, (state, { transaction }) => ({
        ...state,
        transactions: state.transactions.map((value) =>
            value.id === transaction.id
                ? {
                      ...value,
                      amount: transaction.amount,
                      date: transaction.date,
                      description: transaction.description,
                      category: transaction.category,
                      paymentMethod: transaction.paymentMethod,
                      vendor: transaction.vendor,
                      tags: transaction.tags,
                  }
                : value
        ),
        error: null,
        status: "LOADED" as const,
    })),

    on(updateTransactionFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    })),

    /* -------- Deleting ---------- */
    on(deleteTransaction, (state, { id }) => ({ ...state, status: "PENDING" as const })),

    on(deleteTransactionSuccess, (state, { id }) => ({
        ...state,
        transactions: state.transactions.filter((t) => t.id != id),
        error: null,
        status: "LOADED" as const,
    })),

    on(deleteTransactionFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    }))
);
