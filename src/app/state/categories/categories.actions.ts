import { createAction, props } from "@ngrx/store";
import { Category } from "src/app/models/category.model";

/* -------- Loading ---------- */
export const getCategories = createAction("[Categories Component] Get categories");

export const loadCategories = createAction("[Categories API] Load categories");

export const loadCategoriesSuccess = createAction(
    "[Categories API] Categories load success",
    props<{ categories: Category[] }>()
);

export const loadCategoriesFail = createAction(
    "[Categories API] Categories load failure",
    props<{ error: string }>()
);

/* -------- Creating ---------- */
export const createCategory = createAction(
    "[New Category Component] Create new category",
    props<{ category: Category }>()
);

export const createCategorySuccess = createAction(
    "[Categories API] Category create success",
    props<{ category: Category }>()
);

export const createCategoryFail = createAction(
    "[Categories API] Category create failure",
    props<{ error: string }>()
);

/* -------- Updating ---------- */
export const updateCategory = createAction(
    "[New Category Component] Update new category",
    props<{ id: number; category: Category }>()
);

export const updateCategorySuccess = createAction(
    "[Categories API] Category update success",
    props<{ category: Category }>()
);

export const updateCategoryFail = createAction(
    "[Categories API] Category update failure",
    props<{ error: string }>()
);

/* -------- Deleting ---------- */
export const deleteCategory = createAction(
    "[Category Component] Delete category",
    props<{ id: number }>()
);

export const deleteCategorySuccess = createAction(
    "[Categories API] Category delete success",
    props<{ id: number }>()
);

export const deleteCategoryFail = createAction(
    "[Categories API] Category delete failure",
    props<{ error: string }>()
);
