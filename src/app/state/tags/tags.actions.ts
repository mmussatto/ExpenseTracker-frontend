import { createAction, props } from "@ngrx/store";
import { Tag } from "src/app/models/tag.model";

/* -------- Loading ---------- */
export const getTags = createAction("[Tags Component] Get Tags");

export const loadTags = createAction("[Tags API] Load Tags");

export const loadTagsSuccess = createAction(
    "[Tags API] Tags load success",
    props<{ tags: Tag[] }>()
);

export const loadTagsFail = createAction(
    "[Tags API] Tags load failure",
    props<{ error: string }>()
);

/* -------- Creating ---------- */
export const createTag = createAction("[New Tag Component] Create new Tag", props<{ tag: Tag }>());

export const createTagSuccess = createAction(
    "[Tags API] Tag create success",
    props<{ tag: Tag }>()
);

export const createTagFail = createAction(
    "[Tags API] Tag create failure",
    props<{ error: string }>()
);

/* -------- Updating ---------- */
export const updateTag = createAction(
    "[New Tag Component] Update new Tag",
    props<{ id: number; tag: Tag }>()
);

export const updateTagSuccess = createAction(
    "[Tags API] Tag update success",
    props<{ tag: Tag }>()
);

export const updateTagFail = createAction(
    "[Tags API] Tag update failure",
    props<{ error: string }>()
);

/* -------- Deleting ---------- */
export const deleteTag = createAction("[Tag Component] Delete Tag", props<{ id: number }>());

export const deleteTagSuccess = createAction(
    "[Tags API] Tag delete success",
    props<{ id: number }>()
);

export const deleteTagFail = createAction(
    "[Tags API] Tag delete failure",
    props<{ error: string }>()
);
