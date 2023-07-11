import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NavComponent } from "./nav.component";
import { Component } from "@angular/core";

//Stubs
@Component({ selector: "mat-drawer-container", template: "" })
class MatDrawerContainerStubComponent {}

@Component({ selector: "mat-drawer", template: "" })
class MatDrawerStubComponent {}

// Describe
describe("NavComponent", () => {
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NavComponent, MatDrawerContainerStubComponent, MatDrawerStubComponent],
        });
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
