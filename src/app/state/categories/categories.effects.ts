import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { CategoriesService } from "src/app/views/categories/services/categories.service";
import { AppState } from "../app.state";
import {
    createCategory,
    createCategoryFail,
    createCategorySuccess,
    deleteCategory,
    deleteCategoryFail,
    deleteCategorySuccess,
    loadCategories,
    loadCategoriesFail,
    loadCategoriesSuccess,
} from "./categories.actions";
import { catchError, from, map, of, switchMap } from "rxjs";

@Injectable()
export class CategoriesEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private categoriesService: CategoriesService
    ) {}

    /* -------- Loading ---------- */
    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCategories),
            switchMap(() =>
                // Call the getCategories method, convert it to an observable
                from(this.categoriesService.findAllCategories()).pipe(
                    // Take the returned value and return a new success action containing the Categories
                    map((categories) => loadCategoriesSuccess({ categories: categories })),
                    // Or... if it errors return a new failure action containing the error
                    catchError((error) => of(loadCategoriesFail({ error })))
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
                    // Take the returned value and return a new success action containing the new Category
                    map((category) => createCategorySuccess({ category: category })),
                    // Or... if it errors return a new failure action containing the error message
                    catchError((error) => {
                        const errorMessage = error.error.message ?? error.error.messages;
                        return of(
                            createCategoryFail({
                                error: errorMessage, //todo, remove after standardization of backend
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
