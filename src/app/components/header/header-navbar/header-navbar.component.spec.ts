import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideRouter } from "@angular/router";
import { HeaderNavbarItemComponent } from "./header-navbar-item/header-navbar-item.component";
import { HeaderNavbarComponent } from "./header-navbar.component";

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

	it("should remove subscription on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");

		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
