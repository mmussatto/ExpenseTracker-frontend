import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    isNavOpen: boolean = false;

    toggleNav(event: boolean) {
        this.isNavOpen = !this.isNavOpen;
        console.log("toggleNav", event);
    }
}
