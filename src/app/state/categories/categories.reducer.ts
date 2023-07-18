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
    updateCategory,
    updateCategorySuccess,
    updateCategoryFail,
} from "./categories.actions";
import { Category } from "src/app/models/category.model";

/** Categories State */
export interface CategoriesState {
    categories: Category[];
    error: string | null;
    status: "NOT_LOADED" | "LOADING" | "LOADED" | "ERROR" | "PENDING";
}

export const initialState: CategoriesState = {
    categories: [],
    error: null,
    status: "NOT_LOADED",
};

export const categoriesReducer = createReducer(
    initialState,

    /* -------- Loading ---------- */
    on(loadCategories, (state) => ({ ...state, status: "LOADING" as const })),

    on(loadCategoriesSuccess, (state, { categories }) => ({
        ...state,
        categories: categories,
        error: null,
        status: "LOADED" as const,
    })),

    on(loadCategoriesFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    })),

    /* -------- Creating ---------- */
    on(createCategory, (state) => ({ ...state, status: "PENDING" as const })),

    on(createCategorySuccess, (state, { category }) => ({
        ...state,
        categories: [...state.categories, { ...category }],
        error: null,
        status: "LOADED" as const,
    })),

    on(createCategoryFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    })),

    /* -------- Updating ---------- */
    on(updateCategory, (state) => ({ ...state, status: "PENDING" as const })),

    on(updateCategorySuccess, (state, { category }) => ({
        ...state,
        categories: state.categories.map((value) =>
            value.id === category.id
                ? { ...value, name: category.name, color: category.color }
                : value
        ),
        error: null,
        status: "LOADED" as const,
    })),

    on(updateCategoryFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    })),

    /* -------- Deleting ---------- */
    on(deleteCategory, (state, { id }) => ({ ...state, status: "PENDING" as const })),

    on(deleteCategorySuccess, (state, { id }) => ({
        ...state,
        categories: state.categories.filter((c) => c.id != id),
        error: null,
        status: "LOADED" as const,
    })),

    on(deleteCategoryFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    }))
);
