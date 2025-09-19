import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { provideRouter } from "@angular/router";
import { HeaderNavbarComponent } from "./header-navbar/header-navbar.component";
import { HamburgerComponent } from "./hamburger/hamburger.component";
import { LogoComponent } from "./logo/logo.component";

describe("HeaderComponent", () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HeaderComponent, HeaderNavbarComponent, HamburgerComponent, LogoComponent],
			providers: [provideRouter([])],
		}).compileComponents();

		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
