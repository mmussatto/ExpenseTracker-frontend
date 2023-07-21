import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

//Payment Methods
import { AppState } from "../app.state";
import { PaymentMethodsState } from "./payment-methods.reducer";
import { PaymentMethodService } from "src/app/views/payment-methods/services/payment-methods.service";
import {
    createPaymentMethod,
    createPaymentMethodFail,
    createPaymentMethodSuccess,
    deletePaymentMethod,
    deletePaymentMethodFail,
    deletePaymentMethodSuccess,
    getPaymentMethods,
    loadPaymentMethods,
    loadPaymentMethodsFail,
    loadPaymentMethodsSuccess,
    updatePaymentMethod,
    updatePaymentMethodFail,
    updatePaymentMethodSuccess,
} from "./payment-methods.actions";
import { selectPaymentMethodsState } from "./payment-methods.selectors";

//NgRx
import { Action, Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, filter, from, map, of, switchMap, tap, withLatestFrom } from "rxjs";

//Angular Material
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class PaymentMethodsEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private paymentMethodsService: PaymentMethodService,
        private _snackBar: MatSnackBar,
        private router: Router
    ) {}

    /* -------- Loading ---------- */
    getPaymentMethods$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getPaymentMethods),
            withLatestFrom(this.store.select(selectPaymentMethodsState)),
            //Only call loadPaymentMethods if status is "NOT_LOADED" or "ERROR"
            filter(
                ([action, paymentMethod]: [Action, PaymentMethodsState]) =>
                    paymentMethod.status === "NOT_LOADED" || paymentMethod.status === "ERROR"
            ),
            tap((_) => console.log("[Payment Methods Loaded from backend]")),
            map(() => loadPaymentMethods())
        )
    );

    loadPaymentMethods$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPaymentMethods),
            switchMap(() =>
                from(this.paymentMethodsService.findAllPaymentMethods()).pipe(
                    map((paymentMethods) =>
                        loadPaymentMethodsSuccess({ paymentMethods: paymentMethods })
                    ),
                    catchError((error) => {
                        let errorMessage = "";
                        if (error.status === 504) errorMessage = "Server Error";
                        return of(loadPaymentMethodsFail({ error: errorMessage }));
                    })
                )
            )
        )
    );

    /* -------- Creating ---------- */
    createPaymentMethod$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createPaymentMethod),
            switchMap(({ paymentMethod }) =>
                from(this.paymentMethodsService.crateNewPaymentMethod(paymentMethod)).pipe(
                    //Open snackbar with success message
                    tap(() => {
                        this._snackBar
                            .open("Payment method created successfully", "X", {
                                panelClass: ["app-notification-success"],
                                duration: 5000,
                            })
                            //Navigate back to payment methods list after snackbar is dismissed
                            .afterDismissed()
                            .subscribe(() => {
                                this.router.navigate(["payment-methods"]);
                            });
                    }),
                    // Take the returned value and return a new success action containing the new Payment Method
                    map((paymentMethod) =>
                        createPaymentMethodSuccess({ paymentMethod: paymentMethod })
                    ),
                    // Or... if it errors return a new failure action containing the error message
                    catchError((error) => {
                        const errorMessage = error.error.message ?? error.error.messages; //todo, remove after standardization of backend
                        this._snackBar.open(errorMessage, "X", {
                            panelClass: ["app-notification-error"],
                            duration: 5000,
                        });
                        return of(
                            createPaymentMethodFail({
                                error: errorMessage,
                            })
                        );
                    })
                )
            )
        )
    );

    /* -------- Updating ---------- */
    updatePaymentMethod$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updatePaymentMethod),
            switchMap(({ id, paymentMethod }) =>
                from(this.paymentMethodsService.updatePaymentMethod(id, paymentMethod)).pipe(
                    //Open snackbar with success message
                    tap(() => {
                        this._snackBar
                            .open("Payment Method updated successfully", "X", {
                                panelClass: ["app-notification-success"],
                                duration: 5000,
                            })
                            //Navigate back to payment methods list after snackbar is dismissed
                            .afterDismissed()
                            .subscribe(() => {
                                this.router.navigate(["payment-methods"]);
                            });
                    }),
                    // Take the returned value and return a new success action containing the new Payment Method
                    map((paymentMethod) =>
                        updatePaymentMethodSuccess({ paymentMethod: paymentMethod })
                    ),
                    // Or... if it errors return a new failure action containing the error message
                    catchError((error) => {
                        const errorMessage = error.error.message ?? error.error.messages; //todo, remove after standardization of backend
                        this._snackBar.open(errorMessage, "X", {
                            panelClass: ["app-notification-error"],
                            duration: 5000,
                        });
                        return of(
                            updatePaymentMethodFail({
                                error: errorMessage,
                            })
                        );
                    })
                )
            )
        )
    );

    /* -------- Deleting ---------- */
    deletePaymentMethod$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletePaymentMethod),
            switchMap(({ id }) =>
                from(this.paymentMethodsService.deletePaymentMethod(id)).pipe(
                    // Return a new success action containing the deleted payment method's id
                    map(() => deletePaymentMethodSuccess({ id })),
                    // Or... if it errors return a new failure action containing the error message
                    catchError((error) => {
                        return of(
                            deletePaymentMethodFail({
                                error: error.error.message ?? error.error.messages, //todo, remove after standardization of backend
                            })
                        );
                    })
                )
            )
        )
    );
}
