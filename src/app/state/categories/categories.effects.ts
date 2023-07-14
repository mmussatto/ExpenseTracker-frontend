import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { CategoriesService } from "src/app/views/categories/services/categories.service";
import { AppState } from "../app.state";
import {
    addCategory,
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

    // Run this code when a loadCategories action is dispatched
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

    deleteCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCategory),
            switchMap(({ id }) =>
                from(this.categoriesService.deleteCategory(id)).pipe(
                    map(() => deleteCategorySuccess({ id })),
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
