import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

//Tags
import { AppState } from "../app.state";
import { TagsState } from "./tags.reducer";
import { TagsService } from "src/app/views/tags/services/tags.service";
import {
    createTag,
    createTagFail,
    createTagSuccess,
    deleteTag,
    deleteTagFail,
    deleteTagSuccess,
    getTags,
    loadTags,
    loadTagsFail,
    loadTagsSuccess,
    updateTag,
    updateTagFail,
    updateTagSuccess,
} from "./tags.actions";
import { selectTagsState } from "./tags.selectors";

//NgRx
import { Action, Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, filter, from, map, of, switchMap, tap, withLatestFrom } from "rxjs";

//Angular Material
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class TagsEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private tagsService: TagsService,
        private _snackBar: MatSnackBar,
        private router: Router
    ) {}

    /* -------- Loading ---------- */
    getTags$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getTags),
            withLatestFrom(this.store.select(selectTagsState)),
            //Only call loadTags if status is "NOT_LOADED" or "ERROR"
            filter(
                ([action, tag]: [Action, TagsState]) =>
                    tag.status === "NOT_LOADED" || tag.status === "ERROR"
            ),
            tap((_) => console.log("[Tags Loaded from backend]")),
            map(() => loadTags())
        )
    );

    loadTags$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTags),
            switchMap(() =>
                from(this.tagsService.findAllTags()).pipe(
                    map((tags) => loadTagsSuccess({ tags: tags })),
                    catchError((error) => {
                        let errorMessage = "";
                        if (error.status === 504) errorMessage = "Server Error";
                        return of(loadTagsFail({ error: errorMessage }));
                    })
                )
            )
        )
    );

    /* -------- Creating ---------- */
    createTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createTag),
            switchMap(({ tag }) =>
                from(this.tagsService.crateNewTag(tag)).pipe(
                    //Open snackbar with success message
                    tap(() => {
                        this._snackBar
                            .open("Tag created successfully", "X", {
                                panelClass: ["app-notification-success"],
                                duration: 5000,
                            })
                            //Navigate back to tags list after snackbar is dismissed
                            .afterDismissed()
                            .subscribe(() => {
                                this.router.navigate(["tags"]);
                            });
                    }),
                    // Take the returned value and return a new success action containing the new Tag
                    map((tag) => createTagSuccess({ tag: tag })),
                    // Or... if it errors return a new failure action containing the error message
                    catchError((error) => {
                        const errorMessage = error.error.message ?? error.error.messages; //todo, remove after standardization of backend
                        this._snackBar.open(errorMessage, "X", {
                            panelClass: ["app-notification-error"],
                            duration: 5000,
                        });
                        return of(
                            createTagFail({
                                error: errorMessage,
                            })
                        );
                    })
                )
            )
        )
    );

    /* -------- Updating ---------- */
    updateTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateTag),
            switchMap(({ id, tag }) =>
                from(this.tagsService.updateTag(id, tag)).pipe(
                    //Open snackbar with success message
                    tap(() => {
                        this._snackBar
                            .open("Tag updated successfully", "X", {
                                panelClass: ["app-notification-success"],
                                duration: 5000,
                            })
                            //Navigate back to tags list after snackbar is dismissed
                            .afterDismissed()
                            .subscribe(() => {
                                this.router.navigate(["tag"]);
                            });
                    }),
                    // Take the returned value and return a new success action containing the new Tag
                    map((tag) => updateTagSuccess({ tag: tag })),
                    // Or... if it errors return a new failure action containing the error message
                    catchError((error) => {
                        const errorMessage = error.error.message ?? error.error.messages; //todo, remove after standardization of backend
                        this._snackBar.open(errorMessage, "X", {
                            panelClass: ["app-notification-error"],
                            duration: 5000,
                        });
                        return of(
                            updateTagFail({
                                error: errorMessage,
                            })
                        );
                    })
                )
            )
        )
    );

    /* -------- Deleting ---------- */
    deleteTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTag),
            switchMap(({ id }) =>
                from(this.tagsService.deleteTag(id)).pipe(
                    // Return a new success action containing the deleted tag's id
                    map(() => deleteTagSuccess({ id })),
                    // Or... if it errors return a new failure action containing the error message
                    catchError((error) => {
                        return of(
                            deleteTagFail({
                                error: error.error.message ?? error.error.messages, //todo, remove after standardization of backend
                            })
                        );
                    })
                )
            )
        )
    );
}
