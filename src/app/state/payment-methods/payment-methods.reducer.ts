import { createReducer, on } from "@ngrx/store";

import { PaymentMethod } from "src/app/models/payment-method.model";
import {
    createPaymentMethod,
    createPaymentMethodFail,
    createPaymentMethodSuccess,
    deletePaymentMethod,
    deletePaymentMethodFail,
    deletePaymentMethodSuccess,
    loadPaymentMethods,
    loadPaymentMethodsFail,
    loadPaymentMethodsSuccess,
    updatePaymentMethod,
    updatePaymentMethodFail,
    updatePaymentMethodSuccess,
} from "./payment-methods.actions";

/** PaymentMethods State */
export interface PaymentMethodsState {
    paymentMethods: PaymentMethod[];
    error: string | null;
    status: "NOT_LOADED" | "LOADING" | "LOADED" | "ERROR" | "PENDING";
}

export const initialState: PaymentMethodsState = {
    paymentMethods: [],
    error: null,
    status: "NOT_LOADED",
};

export const paymentMethodsReducer = createReducer(
    initialState,

    /* -------- Loading ---------- */
    on(loadPaymentMethods, (state) => ({ ...state, status: "LOADING" as const })),

    on(loadPaymentMethodsSuccess, (state, { paymentMethods }) => ({
        ...state,
        paymentMethods: paymentMethods,
        error: null,
        status: "LOADED" as const,
    })),

    on(loadPaymentMethodsFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    })),

    /* -------- Creating ---------- */
    on(createPaymentMethod, (state) => ({ ...state, status: "PENDING" as const })),

    on(createPaymentMethodSuccess, (state, { paymentMethod }) => ({
        ...state,
        paymentMethods: [...state.paymentMethods, { ...paymentMethod }],
        error: null,
        status: "LOADED" as const,
    })),

    on(createPaymentMethodFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    })),

    /* -------- Updating ---------- */
    on(updatePaymentMethod, (state) => ({ ...state, status: "PENDING" as const })),

    on(updatePaymentMethodSuccess, (state, { paymentMethod }) => ({
        ...state,
        paymentMethods: state.paymentMethods.map((value) =>
            value.id === paymentMethod.id
                ? { ...value, name: paymentMethod.name, type: paymentMethod.type }
                : value
        ),
        error: null,
        status: "LOADED" as const,
    })),

    on(updatePaymentMethodFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    })),

    /* -------- Deleting ---------- */
    on(deletePaymentMethod, (state, { id }) => ({ ...state, status: "PENDING" as const })),

    on(deletePaymentMethodSuccess, (state, { id }) => ({
        ...state,
        paymentMethods: state.paymentMethods.filter((p) => p.id != id),
        error: null,
        status: "LOADED" as const,
    })),

    on(deletePaymentMethodFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    }))
);
