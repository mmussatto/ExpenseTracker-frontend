import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-new-category",
    templateUrl: "./new-category.component.html",
    styleUrls: ["./new-category.component.css"],
})
export class NewCategoryComponent implements OnInit {
    colors = ["GREY", "PURPLE", "RED", "BLUE"];

    newCategoryForm = this.fb.group({
        name: [null, Validators.required],
        color: [null, Validators.required],
    });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {}

    submit() {
        if (!this.newCategoryForm?.valid) {
            return;
        }
        console.log(this.newCategoryForm?.value);
    }
}
