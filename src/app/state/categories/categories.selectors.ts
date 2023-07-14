import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { CategoriesState } from "./categories.reducer";

export const selectCategories = (state: AppState) => state.categories;

export const selectAllCategories = createSelector(
    selectCategories,
    (state: CategoriesState) => state.categories
);
