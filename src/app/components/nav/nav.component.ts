import { Component, Input, OnChanges, ViewChild } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";

@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnChanges {
    @ViewChild("drawer")
    public sidenav?: MatDrawer;

    @Input()
    isNavOpen?: boolean;

    ngOnChanges(): void {
        console.log("ngOnChanges", this.isNavOpen);
        if (this.isNavOpen) {
            this.sidenav?.open();
        } else {
            this.sidenav?.close();
        }
    }
}
