import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Category } from "src/app/models/category.model";
import { colors } from "src/app/models/colors.model";
import { AppState } from "src/app/state/app.state";
import { getCategories, updateCategory } from "src/app/state/categories/categories.actions";
import { selectCategoryById } from "src/app/state/categories/categories.selectors";
import { ConfirmDialogComponent } from "src/app/templates/dialogs/confirm-dialog/confirm-dialog.component";

@Component({
    selector: "app-update-category",
    templateUrl: "./update-category.component.html",
    styleUrls: ["./update-category.component.css"],
})
export class UpdateCategoryComponent implements OnInit {
    colors = colors;

    id = Number(this.route.snapshot.paramMap.get("id"));

    //Categories from the store
    category$ = this.store.select(selectCategoryById(this.id));

    updateCategoryForm: any;
    initialValues: any;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.store.dispatch(getCategories());

        this.category$.subscribe((category) => {
            //Update form with category values
            this.updateCategoryForm = this.fb.group({
                id: [{ value: category?.id?.toString(), disabled: true }, Validators.required],
                name: [category?.name, Validators.required],
                color: [category?.color, Validators.required],
            });

            //Save initial values for comparing in hasChanged()
            this.initialValues = this.updateCategoryForm.getRawValue();
        });
    }

    hasChanged(): boolean {
        return (
            JSON.stringify(this.updateCategoryForm.getRawValue()) !==
            JSON.stringify(this.initialValues)
        );
    }

    submit() {
        if (!this.updateCategoryForm.valid) {
            return;
        }

        //Get category values to send to backend (does not get the id because it needs to be null)
        const category = { ...this.updateCategoryForm.value } as Category;

        //Dispatch update action
        this.store.dispatch(updateCategory({ id: this.id, category }));
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { info: "Update category?" },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === true) {
                this.submit();
            }
        });
    }
}
