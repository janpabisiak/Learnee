import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MobileMenuComponent } from "./mobile-menu.component";
import { LogoComponent } from "../logo/logo.component";
import { HeaderNavbarComponent } from "../header-navbar/header-navbar.component";
import { provideRouter } from "@angular/router";
import { provideTranslateService } from "@ngx-translate/core";

describe("MobileMenuComponent", () => {
	let component: MobileMenuComponent;
	let fixture: ComponentFixture<MobileMenuComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MobileMenuComponent, LogoComponent, HeaderNavbarComponent],
			providers: [
				provideRouter([]),
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(MobileMenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
