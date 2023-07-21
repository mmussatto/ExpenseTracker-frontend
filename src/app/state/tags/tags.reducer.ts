import { createReducer, on } from "@ngrx/store";
import { Tag } from "src/app/models/tag.model";
import {
    createTag,
    createTagFail,
    createTagSuccess,
    deleteTag,
    deleteTagFail,
    deleteTagSuccess,
    loadTags,
    loadTagsFail,
    loadTagsSuccess,
    updateTag,
    updateTagFail,
    updateTagSuccess,
} from "./tags.actions";

/** Tags State */
export interface TagsState {
    tags: Tag[];
    error: string | null;
    status: "NOT_LOADED" | "LOADING" | "LOADED" | "ERROR" | "PENDING";
}

export const initialState: TagsState = {
    tags: [],
    error: null,
    status: "NOT_LOADED",
};

export const tagsReducer = createReducer(
    initialState,

    /* -------- Loading ---------- */
    on(loadTags, (state) => ({ ...state, status: "LOADING" as const })),

    on(loadTagsSuccess, (state, { tags }) => ({
        ...state,
        tags: tags,
        error: null,
        status: "LOADED" as const,
    })),

    on(loadTagsFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    })),

    /* -------- Creating ---------- */
    on(createTag, (state) => ({ ...state, status: "PENDING" as const })),

    on(createTagSuccess, (state, { tag }) => ({
        ...state,
        tags: [...state.tags, { ...tag }],
        error: null,
        status: "LOADED" as const,
    })),

    on(createTagFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    })),

    /* -------- Updating ---------- */
    on(updateTag, (state) => ({ ...state, status: "PENDING" as const })),

    on(updateTagSuccess, (state, { tag }) => ({
        ...state,
        tags: state.tags.map((value) =>
            value.id === tag.id
                ? {
                      ...value,
                      name: tag.name,
                      color: tag.color,
                  }
                : value
        ),
        error: null,
        status: "LOADED" as const,
    })),

    on(updateTagFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    })),

    /* -------- Deleting ---------- */
    on(deleteTag, (state, { id }) => ({ ...state, status: "PENDING" as const })),

    on(deleteTagSuccess, (state, { id }) => ({
        ...state,
        tags: state.tags.filter((t) => t.id != id),
        error: null,
        status: "LOADED" as const,
    })),

    on(deleteTagFail, (state, { error }) => ({
        ...state,
        error: error,
        status: "ERROR" as const,
    }))
);
