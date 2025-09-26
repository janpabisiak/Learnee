import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderNavbarItemComponent } from "./header-navbar-item.component";
import { provideHttpClient } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideTranslateService } from "@ngx-translate/core";

describe("HeaderNavbarItemComponent", () => {
	let component: HeaderNavbarItemComponent;
	let fixture: ComponentFixture<HeaderNavbarItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HeaderNavbarItemComponent],
			providers: [
				provideHttpClient(),
				provideRouter([]),
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(HeaderNavbarItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
