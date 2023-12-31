import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

//Categories
import { AppState } from "../app.state";
import { CategoriesState } from "./categories.reducer";
import { CategoriesService } from "src/app/views/categories/services/categories.service";
import {
    createCategory,
    createCategoryFail,
    createCategorySuccess,
    deleteCategory,
    deleteCategoryFail,
    deleteCategorySuccess,
    getCategories,
    loadCategories,
    loadCategoriesFail,
    loadCategoriesSuccess,
    updateCategory,
    updateCategoryFail,
    updateCategorySuccess,
} from "./categories.actions";
import { selectCategoriesState } from "./categories.selectors";

//NgRx
import { Action, Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, filter, from, map, of, switchMap, tap, withLatestFrom } from "rxjs";

//Angular Material
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class CategoriesEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private categoriesService: CategoriesService,
        private _snackBar: MatSnackBar,
        private router: Router
    ) {}

    /* -------- Loading ---------- */
    getCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCategories),
            withLatestFrom(this.store.select(selectCategoriesState)),
            filter(
                ([action, categories]: [Action, CategoriesState]) =>
                    categories.status === "NOT_LOADED" || categories.status === "ERROR"
            ),
            tap((_) => console.log("[Categories Loaded]")),
            map(() => loadCategories())
        )
    );

    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCategories),
            switchMap(() =>
                // Call the getCategories method, convert it to an observable
                from(this.categoriesService.findAllCategories()).pipe(
                    // Take the returned value and return a new success action containing the Categories
                    map((categories) => loadCategoriesSuccess({ categories: categories })),
                    // Or... if it errors return a new failure action containing the error
                    catchError((error) => {
                        let errorMessage = "";
                        if (error.status === 504) errorMessage = "Server Error";
                        return of(loadCategoriesFail({ error: errorMessage }));
                    })
                )
            )
        )
    );

    /* -------- Creating ---------- */
    createCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createCategory),
            switchMap(({ category }) =>
                // Call the createNewCategory method, convert it to an observable
                from(this.categoriesService.createNewCategory(category)).pipe(
                    //If success, show snackbar and redirect to categories list page
                    tap(() => {
                        this._snackBar
                            .open("Category created successfully", "X", {
                                panelClass: ["app-notification-success"],
                                duration: 5000,
                            })
                            .afterDismissed()
                            .subscribe(() => {
                                //Navigate back to categories list after snackbar is dismissed
                                this.router.navigate(["categories"]);
                            });
                    }),
                    // Take the returned value and return a new success action containing the new Category
                    map((category) => createCategorySuccess({ category: category })),
                    // Or... if it errors return a new failure action containing the error message
                    catchError((error) => {
                        const errorMessage = error.error.message ?? error.error.messages; //todo, remove after standardization of backend
                        this._snackBar.open(errorMessage, "X", {
                            panelClass: ["app-notification-error"],
                            duration: 5000,
                        });
                        return of(
                            createCategoryFail({
                                error: errorMessage,
                            })
                        );
                    })
                )
            )
        )
    );

    /* -------- Updating ---------- */
    updateCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCategory),
            switchMap(({ id, category }) =>
                // Call the update method, convert it to an observable
                from(this.categoriesService.updateCategory(id, category)).pipe(
                    //If success, show snackbar and redirect to categories list page
                    tap(() => {
                        this._snackBar
                            .open("Category updated successfully", "X", {
                                panelClass: ["app-notification-success"],
                                duration: 5000,
                            })
                            .afterDismissed()
                            .subscribe(() => {
                                //Navigate back to categories list after snackbar is dismissed
                                this.router.navigate(["categories"]);
                            });
                    }),
                    // Take the returned value and return a new success action containing the new Category
                    map((category) => updateCategorySuccess({ category: category })),
                    // Or... if it errors return a new failure action containing the error message
                    catchError((error) => {
                        const errorMessage = error.error.message ?? error.error.messages; //todo, remove after standardization of backend
                        this._snackBar.open(errorMessage, "X", {
                            panelClass: ["app-notification-error"],
                            duration: 5000,
                        });
                        return of(
                            updateCategoryFail({
                                error: errorMessage,
                            })
                        );
                    })
                )
            )
        )
    );

    /* -------- Deleting ---------- */
    deleteCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCategory),
            switchMap(({ id }) =>
                // Call the deleteCategory method, convert it to an observable
                from(this.categoriesService.deleteCategory(id)).pipe(
                    // Return a new success action containing the deleted category's id
                    map(() => deleteCategorySuccess({ id })),
                    // Or... if it errors return a new failure action containing the error message
                    catchError((error) => {
                        return of(
                            deleteCategoryFail({
                                error: error.error.message ?? error.error.messages, //todo, remove after standardization of backend
                            })
                        );
                    })
                )
            )
        )
    );
}
