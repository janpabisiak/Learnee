import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ErrorPageComponent } from "./error-page.component";
import { provideTranslateService } from "@ngx-translate/core";

describe("ErrorPageComponent", () => {
	let component: ErrorPageComponent;
	let fixture: ComponentFixture<ErrorPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ErrorPageComponent],
			providers: [
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ErrorPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
