import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoriesService, Category } from "../../services/categories.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/templates/dialogs/confirm-dialog/confirm-dialog.component";

@Component({
    selector: "app-new-category",
    templateUrl: "./new-category.component.html",
    styleUrls: ["./new-category.component.css"],
})
export class NewCategoryComponent implements OnInit {
    colors = ["GREY", "PURPLE", "RED", "BLUE"];

    newCategoryForm = this.fb.group({
        name: ["", Validators.required],
        color: ["", Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        private categoryService: CategoriesService,
        private router: Router,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {}

    submit() {
        if (!this.newCategoryForm.valid) {
            return;
        }

        const category = { ...this.newCategoryForm.value };

        this.categoryService.createNewCategory(category as Category).subscribe({
            error: (error) => {
                //show snackbar with error message
                this.openSnackBar(error.error.message ?? error.error.messages, "error");
            },
            complete: () => {
                this.openSnackBar("Category created successfully", "success")
                    .afterDismissed()
                    .subscribe(() => {
                        //navigate back to categories list after snackbar is dismissed
                        this.router.navigate(["categories"]);
                    });
            },
        });
    }

    //Function to show snack bar with custom styling
    openSnackBar(message: string, type: string) {
        let snackbarConfig = {};
        if (type === "error") {
            snackbarConfig = { panelClass: ["app-notification-error"] };
        } else if (type === "success") {
            snackbarConfig = { panelClass: ["app-notification-success"] };
        }

        snackbarConfig = { ...snackbarConfig, duration: 5000 };

        return this._snackBar.open(message, "X", snackbarConfig);
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
