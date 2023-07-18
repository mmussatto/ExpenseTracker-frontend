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
            console.log("CATEGORY", category);

            this.updateCategoryForm = this.fb.group({
                id: [{ value: category?.id?.toString(), disabled: true }, Validators.required],
                name: [category?.name, Validators.required],
                color: [category?.color, Validators.required],
            });

            this.initialValues = this.updateCategoryForm.getRawValue();

            console.log("VALUE", this.updateCategoryForm.getRawValue());
            console.log("Has changed: ", this.hasChanged());
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
        console.log(this.updateCategoryForm.getRawValue());

        const category = { ...this.updateCategoryForm.value } as Category;
        console.log(category);

        this.store.dispatch(updateCategory({ id: this.id, category }));
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { info: "Crate new category?" },
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
            if (result === true) {
                this.submit();
            }
        });
    }
}
