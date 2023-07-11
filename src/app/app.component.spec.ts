import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { Component, Input } from "@angular/core";

//Stubs
@Component({ selector: "app-header", template: "" })
class AppHeaderStubComponent {}

@Component({ selector: "app-footer", template: "" })
class AppFooterStubComponent {}

@Component({ selector: "app-nav", template: "" })
class AppNavStubComponent {
    @Input() isNavOpen: any;
}

//Describe
describe("AppComponent", () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                AppComponent,
                AppHeaderStubComponent,
                AppFooterStubComponent,
                AppNavStubComponent,
            ],
        })
    );

    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
