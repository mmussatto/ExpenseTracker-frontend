import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

//Vendors
import { AppState } from "../app.state";
import { VendorsState } from "./vendors.reducer";
import { VendorsService } from "src/app/views/vendors/services/vendors.service";
import {
    createVendor,
    createVendorFail,
    createVendorSuccess,
    deleteVendor,
    deleteVendorFail,
    deleteVendorSuccess,
    getVendors,
    loadVendors,
    loadVendorsFail,
    loadVendorsSuccess,
    updateVendor,
    updateVendorFail,
    updateVendorSuccess,
} from "./vendors.actions";
import { selectVendorsState } from "./vendors.selectors";

//NgRx
import { Action, Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, filter, from, map, of, switchMap, tap, withLatestFrom } from "rxjs";

//Angular Material
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class VendorsEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private vendorsService: VendorsService,
        private _snackBar: MatSnackBar,
        private router: Router
    ) {}

    /* -------- Loading ---------- */
    getVendors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getVendors),
            withLatestFrom(this.store.select(selectVendorsState)),
            //Only call loadVendors if status is "NOT_LOADED" or "ERROR"
            filter(
                ([action, vendor]: [Action, VendorsState]) =>
                    vendor.status === "NOT_LOADED" || vendor.status === "ERROR"
            ),
            tap((_) => console.log("[Vendors Loaded from backend]")),
            map(() => loadVendors())
        )
    );

    loadVendors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadVendors),
            switchMap(() =>
                from(this.vendorsService.findAllVendors()).pipe(
                    map((vendors) => loadVendorsSuccess({ vendors: vendors })),
                    catchError((error) => {
                        let errorMessage = "";
                        if (error.status === 504) errorMessage = "Server Error";
                        return of(loadVendorsFail({ error: errorMessage }));
                    })
                )
            )
        )
    );

    /* -------- Creating ---------- */
    createVendor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createVendor),
            switchMap(({ vendor }) =>
                from(this.vendorsService.crateNewVendor(vendor)).pipe(
                    //Open snackbar with success message
                    tap(() => {
                        this._snackBar
                            .open("Vendor created successfully", "X", {
                                panelClass: ["app-notification-success"],
                                duration: 5000,
                            })
                            //Navigate back to vendors list after snackbar is dismissed
                            .afterDismissed()
                            .subscribe(() => {
                                this.router.navigate(["payment-methods"]);
                            });
                    }),
                    // Take the returned value and return a new success action containing the new Vendor
                    map((vendor) => createVendorSuccess({ vendor: vendor })),
                    // Or... if it errors return a new failure action containing the error message
                    catchError((error) => {
                        const errorMessage = error.error.message ?? error.error.messages; //todo, remove after standardization of backend
                        this._snackBar.open(errorMessage, "X", {
                            panelClass: ["app-notification-error"],
                            duration: 5000,
                        });
                        return of(
                            createVendorFail({
                                error: errorMessage,
                            })
                        );
                    })
                )
            )
        )
    );

    /* -------- Updating ---------- */
    updateVendor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateVendor),
            switchMap(({ id, vendor }) =>
                from(this.vendorsService.updateVendor(id, vendor)).pipe(
                    //Open snackbar with success message
                    tap(() => {
                        this._snackBar
                            .open("Vendor updated successfully", "X", {
                                panelClass: ["app-notification-success"],
                                duration: 5000,
                            })
                            //Navigate back to vendors list after snackbar is dismissed
                            .afterDismissed()
                            .subscribe(() => {
                                this.router.navigate(["payment-methods"]);
                            });
                    }),
                    // Take the returned value and return a new success action containing the new Vendor
                    map((vendor) => updateVendorSuccess({ vendor: vendor })),
                    // Or... if it errors return a new failure action containing the error message
                    catchError((error) => {
                        const errorMessage = error.error.message ?? error.error.messages; //todo, remove after standardization of backend
                        this._snackBar.open(errorMessage, "X", {
                            panelClass: ["app-notification-error"],
                            duration: 5000,
                        });
                        return of(
                            updateVendorFail({
                                error: errorMessage,
                            })
                        );
                    })
                )
            )
        )
    );

    /* -------- Deleting ---------- */
    deleteVendor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteVendor),
            switchMap(({ id }) =>
                from(this.vendorsService.deleteVendor(id)).pipe(
                    // Return a new success action containing the deleted vendor's id
                    map(() => deleteVendorSuccess({ id })),
                    // Or... if it errors return a new failure action containing the error message
                    catchError((error) => {
                        return of(
                            deleteVendorFail({
                                error: error.error.message ?? error.error.messages, //todo, remove after standardization of backend
                            })
                        );
                    })
                )
            )
        )
    );
}
