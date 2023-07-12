import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoriesService, Category } from "../../services/categories.service";

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

    constructor(private fb: FormBuilder, private categoryService: CategoriesService) {}

    ngOnInit(): void {}

    submit() {
        if (!this.newCategoryForm.valid) {
            return;
        }

        const category = { ...this.newCategoryForm.value };

        this.categoryService.createNewCategory(category as Category).subscribe((newCategory) => {
            console.log(newCategory);
        });
    }
}
