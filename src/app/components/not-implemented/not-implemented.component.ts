import { Component } from "@angular/core";
import { Location } from "@angular/common";

@Component({
    selector: "app-not-implemented",
    templateUrl: "./not-implemented.component.html",
    styleUrls: ["./not-implemented.component.css"],
})
export class NotImplementedComponent {
    constructor(private _location: Location) {}

    goBack() {
        this._location.back();
    }
}
