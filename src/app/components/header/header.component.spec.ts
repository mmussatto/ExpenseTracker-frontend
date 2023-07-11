import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { Component } from "@angular/core";

@Component({ selector: "mat-toolbar", template: "" })
class MatToolbarStubComponent {}

@Component({ selector: "mat-icon", template: "" })
class MatIconStubComponent {}

describe("HeaderComponent", () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent, MatToolbarStubComponent, MatIconStubComponent],
        });
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
