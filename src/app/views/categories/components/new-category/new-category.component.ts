import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AppState } from "src/app/state/app.state";
import { Store } from "@ngrx/store";
import { createCategory } from "src/app/state/categories/categories.actions";
import { Category } from "src/app/models/category.model";
import { ConfirmDialogComponent } from "src/app/templates/dialogs/confirm-dialog/confirm-dialog.component";

@Component({
    selector: "app-new-category",
    templateUrl: "./new-category.component.html",
    styleUrls: ["./new-category.component.css"],
})
export class NewCategoryComponent {
    colors = ["GREY", "PURPLE", "RED", "BLUE"];

    newCategoryForm = this.fb.group({
        name: ["", Validators.required],
        color: ["", Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        private store: Store<AppState>,
        private dialog: MatDialog
    ) {}

    submit() {
        if (!this.newCategoryForm.valid) {
            return;
        }
        const category = { ...this.newCategoryForm.value } as Category;
        this.store.dispatch(createCategory({ category }));
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
