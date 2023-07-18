import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { CategoriesState } from "./categories.reducer";

export const selectCategoriesState = (state: AppState) => state.categories;

export const selectAllCategories = createSelector(
    selectCategoriesState,
    (state: CategoriesState) => state.categories
);

export const selectCategoryById = (id: number) =>
    createSelector(selectCategoriesState, (state: CategoriesState) => {
        return state.categories.find((category) => category.id === id);
    });
