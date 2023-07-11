import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FooterComponent } from "./footer.component";
import { Component } from "@angular/core";

@Component({ selector: "mat-toolbar", template: "" })
class MatToolbarStubComponent {}

describe("FooterComponent", () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FooterComponent, MatToolbarStubComponent],
        });
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
