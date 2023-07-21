import { createAction, props } from "@ngrx/store";
import { Transaction } from "src/app/models/transaction.model";

/* -------- Loading ---------- */
export const getTransactions = createAction("[Transactions Component] Get Transactions");

export const loadTransactions = createAction("[Transactions API] Load Transactions");

export const loadTransactionsSuccess = createAction(
    "[Transactions API] Transactions load success",
    props<{ transactions: Transaction[] }>()
);

export const loadTransactionsFail = createAction(
    "[Transactions API] Transactions load failure",
    props<{ error: string }>()
);

/* -------- Creating ---------- */
export const createTransaction = createAction(
    "[New Transaction Component] Create new Transaction",
    props<{ transaction: Transaction }>()
);

export const createTransactionSuccess = createAction(
    "[Transactions API] Transaction create success",
    props<{ transaction: Transaction }>()
);

export const createTransactionFail = createAction(
    "[Transactions API] Transaction create failure",
    props<{ error: string }>()
);

/* -------- Updating ---------- */
export const updateTransaction = createAction(
    "[New Transaction Component] Update new Transaction",
    props<{ id: number; transaction: Transaction }>()
);

export const updateTransactionSuccess = createAction(
    "[Transactions API] Transaction update success",
    props<{ transaction: Transaction }>()
);

export const updateTransactionFail = createAction(
    "[Transactions API] Transaction update failure",
    props<{ error: string }>()
);

/* -------- Deleting ---------- */
export const deleteTransaction = createAction(
    "[Transaction Component] Delete Transaction",
    props<{ id: number }>()
);

export const deleteTransactionSuccess = createAction(
    "[Transactions API] Transaction delete success",
    props<{ id: number }>()
);

export const deleteTransactionFail = createAction(
    "[Transactions API] Transaction delete failure",
    props<{ error: string }>()
);
