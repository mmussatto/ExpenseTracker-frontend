import { createAction, props } from "@ngrx/store";
import { PaymentMethod } from "src/app/models/payment-method.model";

/* -------- Loading ---------- */
export const getPaymentMethods = createAction("[Payment Methods Component] Get Payment Methods");

export const loadPaymentMethods = createAction("[Payment Methods API] Load Payment Methods");

export const loadPaymentMethodsSuccess = createAction(
    "[Payment Methods API] Payment Methods load success",
    props<{ paymentMethods: PaymentMethod[] }>()
);

export const loadPaymentMethodsFail = createAction(
    "[Payment Methods API] Payment Methods load failure",
    props<{ error: string }>()
);

/* -------- Creating ---------- */
export const createPaymentMethod = createAction(
    "[New Payment Method Component] Create new paymentMethod",
    props<{ paymentMethod: PaymentMethod }>()
);

export const createPaymentMethodSuccess = createAction(
    "[Payment Methods API] PaymentMethod create success",
    props<{ paymentMethod: PaymentMethod }>()
);

export const createPaymentMethodFail = createAction(
    "[Payment Methods API] Payment Method create failure",
    props<{ error: string }>()
);

/* -------- Updating ---------- */
export const updatePaymentMethod = createAction(
    "[New Payment Method Component] Update new payment method",
    props<{ id: number; paymentMethod: PaymentMethod }>()
);

export const updatePaymentMethodSuccess = createAction(
    "[Payment Methods API] Payment Method update success",
    props<{ paymentMethod: PaymentMethod }>()
);

export const updatePaymentMethodFail = createAction(
    "[Payment Methods API] Payment Method update failure",
    props<{ error: string }>()
);

/* -------- Deleting ---------- */
export const deletePaymentMethod = createAction(
    "[Payment Method Component] Delete payment method",
    props<{ id: number }>()
);

export const deletePaymentMethodSuccess = createAction(
    "[Payment Methods API] Payment method delete success",
    props<{ id: number }>()
);

export const deletePaymentMethodFail = createAction(
    "[Payment Methods API] Payment method delete failure",
    props<{ error: string }>()
);
