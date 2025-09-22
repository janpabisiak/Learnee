import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PaginationButtonsComponent } from "./pagination-buttons.component";
import { createMockPaginationService, IMockPaginationService } from "app/app.component.spec";
import { PaginationService } from "@services/pagination.service";

describe("PaginationButtonsComponent", () => {
	let component: PaginationButtonsComponent;
	let fixture: ComponentFixture<PaginationButtonsComponent>;
	let mockPaginationService: IMockPaginationService;

	beforeEach(async () => {
		mockPaginationService = createMockPaginationService();

		await TestBed.configureTestingModule({
			imports: [PaginationButtonsComponent],
			providers: [{ provide: PaginationService, useValue: mockPaginationService }],
		}).compileComponents();

		fixture = TestBed.createComponent(PaginationButtonsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should update properties values on subscriptions change", () => {
		mockPaginationService.page$.next(2);
		mockPaginationService.maxPage$.next(2);

		expect(component.page).toBe(2);
		expect(component.maxPage).toBe(2);
		expect(component.pages).toEqual([0, 1]);
	});

	it("should call paginationService.setPage on setPage call", () => {
		component.setPage(3);

		expect(mockPaginationService.setPage).toHaveBeenCalledOnceWith(3);
	});

	it("should remove subscriptions on destroy", () => {
		const unsubscribeSpy = spyOn(component["subscription"], "unsubscribe");
		component.ngOnDestroy();

		expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
	});
});
