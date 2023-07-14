import { createReducer, on } from "@ngrx/store";
import {
    loadCategories,
    loadCategoriesSuccess,
    loadCategoriesFail,
    deleteCategory,
    deleteCategorySuccess,
    deleteCategoryFail,
    createCategory,
    createCategorySuccess,
    createCategoryFail,
} from "./categories.actions";
import { Category } from "src/app/models/category.model";

/** Categories State */
export interface CategoriesState {
    categories: Category[];
    error: string | null;
    status: "pending" | "loading" | "error" | "success";
}

export const initialState: CategoriesState = {
    categories: [],
    error: null,
    status: "pending",
};

export const categoriesReducer = createReducer(
    initialState,

    /* -------- Loading ---------- */
    on(loadCategories, (state) => ({ ...state, status: "loading" as const })),

    on(loadCategoriesSuccess, (state, { categories }) => ({
        ...state,
        categories: categories,
        error: null,
        status: "success" as const,
    })),

    on(loadCategoriesFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "error" as const,
    })),

    /* -------- Creating ---------- */
    on(createCategory, (state) => ({ ...state, status: "pending" as const })),

    on(createCategorySuccess, (state, { category }) => ({
        ...state,
        categories: [...state.categories, { ...category }],
        error: null,
        status: "success" as const,
    })),

    on(createCategoryFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "error" as const,
    })),

    /* -------- Deleting ---------- */
    on(deleteCategory, (state, { id }) => ({ ...state, status: "pending" as const })),

    on(deleteCategorySuccess, (state, { id }) => ({
        ...state,
        categories: state.categories.filter((c) => c.id != id),
        error: null,
        status: "success" as const,
    })),

    on(deleteCategoryFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "error" as const,
    }))
);
