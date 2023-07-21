import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

//Transactions
import { AppState } from "../app.state";
import { TransactionsState } from "./transactions.reducer";
import { TransactionsService } from "src/app/views/transactions/services/transactions.service";
import {
    createTransaction,
    createTransactionFail,
    createTransactionSuccess,
    deleteTransaction,
    deleteTransactionFail,
    deleteTransactionSuccess,
    getTransactions,
    loadTransactions,
    loadTransactionsFail,
    loadTransactionsSuccess,
    updateTransaction,
    updateTransactionFail,
    updateTransactionSuccess,
} from "./transactions.actions";
import { selectTransactionsState } from "./transactions.selectors";

//NgRx
import { Action, Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, filter, from, map, of, switchMap, tap, withLatestFrom } from "rxjs";

//Angular Material
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class TransactionsEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private transactionsService: TransactionsService,
        private _snackBar: MatSnackBar,
        private router: Router
    ) {}

    /* -------- Loading ---------- */
    getTransactions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getTransactions),
            withLatestFrom(this.store.select(selectTransactionsState)),
            //Only call loadTransactions if status is "NOT_LOADED" or "ERROR"
            filter(
                ([action, transaction]: [Action, TransactionsState]) =>
                    transaction.status === "NOT_LOADED" || transaction.status === "ERROR"
            ),
            tap((_) => console.log("[Transactions Loaded from backend]")),
            map(() => loadTransactions())
        )
    );

    loadTransactions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTransactions),
            switchMap(() =>
                from(this.transactionsService.findAllTransactions()).pipe(
                    map((transactions) => loadTransactionsSuccess({ transactions: transactions })),
                    catchError((error) => {
                        let errorMessage = "";
                        if (error.status === 504) errorMessage = "Server Error";
                        return of(loadTransactionsFail({ error: errorMessage }));
                    })
                )
            )
        )
    );

    /* -------- Creating ---------- */
    createTransaction$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createTransaction),
            switchMap(({ transaction }) =>
                from(this.transactionsService.crateNewTransaction(transaction)).pipe(
                    //Open snackbar with success message
                    tap(() => {
                        this._snackBar
                            .open("Transaction created successfully", "X", {
                                panelClass: ["app-notification-success"],
                                duration: 5000,
                            })
                            //Navigate back to transactions list after snackbar is dismissed
                            .afterDismissed()
                            .subscribe(() => {
                                this.router.navigate(["transactions"]);
                            });
                    }),
                    // Take the returned value and return a new success action containing the new Transaction
                    map((transaction) => createTransactionSuccess({ transaction: transaction })),
                    // Or... if it errors return a new failure action containing the error message
                    catchError((error) => {
                        const errorMessage = error.error.message ?? error.error.messages; //todo, remove after standardization of backend
                        this._snackBar.open(errorMessage, "X", {
                            panelClass: ["app-notification-error"],
                            duration: 5000,
                        });
                        return of(
                            createTransactionFail({
                                error: errorMessage,
                            })
                        );
                    })
                )
            )
        )
    );

    /* -------- Updating ---------- */
    updateTransaction$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateTransaction),
            switchMap(({ id, transaction }) =>
                from(this.transactionsService.updateTransaction(id, transaction)).pipe(
                    //Open snackbar with success message
                    tap(() => {
                        this._snackBar
                            .open("Transaction updated successfully", "X", {
                                panelClass: ["app-notification-success"],
                                duration: 5000,
                            })
                            //Navigate back to transactions list after snackbar is dismissed
                            .afterDismissed()
                            .subscribe(() => {
                                this.router.navigate(["transaction"]);
                            });
                    }),
                    // Take the returned value and return a new success action containing the new Transaction
                    map((transaction) => updateTransactionSuccess({ transaction: transaction })),
                    // Or... if it errors return a new failure action containing the error message
                    catchError((error) => {
                        const errorMessage = error.error.message ?? error.error.messages; //todo, remove after standardization of backend
                        this._snackBar.open(errorMessage, "X", {
                            panelClass: ["app-notification-error"],
                            duration: 5000,
                        });
                        return of(
                            updateTransactionFail({
                                error: errorMessage,
                            })
                        );
                    })
                )
            )
        )
    );

    /* -------- Deleting ---------- */
    deleteTransaction$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTransaction),
            switchMap(({ id }) =>
                from(this.transactionsService.deleteTransaction(id)).pipe(
                    // Return a new success action containing the deleted transaction's id
                    map(() => deleteTransactionSuccess({ id })),
                    // Or... if it errors return a new failure action containing the error message
                    catchError((error) => {
                        return of(
                            deleteTransactionFail({
                                error: error.error.message ?? error.error.messages, //todo, remove after standardization of backend
                            })
                        );
                    })
                )
            )
        )
    );
}
