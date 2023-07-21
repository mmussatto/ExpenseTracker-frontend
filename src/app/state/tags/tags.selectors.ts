import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { TagsState } from "./tags.reducer";

export const selectTagsState = (state: AppState) => state.tags;

export const selectAllTags = createSelector(selectTagsState, (state: TagsState) => state.tags);

export const selectPaymentMethodById = (id: number) =>
    createSelector(selectTagsState, (state: TagsState) => {
        return state.tags.find((tag) => tag.id === id);
    });
