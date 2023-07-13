import { createAction, props } from "@ngrx/store";
import { Category } from "src/app/models/category.model";

export const addCategory = createAction(
    "[New Category Component] Add category",
    props<{ name: string; color: string }>()
);

export const deleteCategory = createAction(
    "[Category Component] Delete category",
    props<{ id: number }>()
);

export const loadCategories = createAction("[Categories Component] Load categories");

export const loadCategoriesSuccess = createAction(
    "[Categories API] Categories load success",
    props<{ categories: Category[] }>()
);

export const loadCategoriesFail = createAction(
    "[Categories API] Categories load failure",
    props<{ error: string }>()
);
