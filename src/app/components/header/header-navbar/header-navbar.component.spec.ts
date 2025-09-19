import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderNavbarComponent } from "./header-navbar.component";
import { provideRouter } from "@angular/router";
import { HeaderNavbarItemComponent } from "./header-navbar-item/header-navbar-item.component";

describe("HeaderNavbarComponent", () => {
	let component: HeaderNavbarComponent;
	let fixture: ComponentFixture<HeaderNavbarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HeaderNavbarComponent, HeaderNavbarItemComponent],
			providers: [provideRouter([])],
		}).compileComponents();

		fixture = TestBed.createComponent(HeaderNavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
