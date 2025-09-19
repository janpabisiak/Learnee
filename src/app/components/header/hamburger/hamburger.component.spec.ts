import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HamburgerComponent } from "./hamburger.component";
import { createMockModalService, IMockModalService } from "app/app.component.spec";
import { ModalService } from "@services/modal.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("HamburgerComponent", () => {
	let component: HamburgerComponent;
	let fixture: ComponentFixture<HamburgerComponent>;
	let mockModalService: IMockModalService;

	beforeEach(async () => {
		mockModalService = createMockModalService();

		await TestBed.configureTestingModule({
			imports: [HamburgerComponent],
			providers: [{ provide: ModalService, useValue: mockModalService }],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(HamburgerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should update isMobileNavbarOpen property on subscription change", () => {
		mockModalService.isMobileNavbarOpen$.next(true);

		expect(component.isMobileNavbarOpen).toBeTrue();
	});

	it("should call modalService.toggleIsMobileNavbarOpen on toggleNavbarMenu call", () => {
		component.toggleNavbarMenu();

		expect(mockModalService.toggleIsMobileNavbarOpen).toHaveBeenCalledOnceWith(true);
	});

	it("should remove subscription on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");

		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
