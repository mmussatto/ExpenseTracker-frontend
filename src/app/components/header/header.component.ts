import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
    @Output()
    toggleNav: EventEmitter<boolean> = new EventEmitter<boolean>();

    clickMenu() {
        this.toggleNav.emit();
    }
}
