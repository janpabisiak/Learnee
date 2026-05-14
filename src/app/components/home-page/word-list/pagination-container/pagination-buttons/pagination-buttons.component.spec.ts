import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PaginationButtonsComponent } from "./pagination-buttons.component";
import { createMockWordsService, IMockWordsService } from "@services/words/words.service.mock";
import { WordsService } from "@services/words/words.service";

describe("PaginationButtonsComponent", () => {
	let component: PaginationButtonsComponent;
	let fixture: ComponentFixture<PaginationButtonsComponent>;
	let mockWordsService: IMockWordsService;

	beforeEach(async () => {
		mockWordsService = createMockWordsService();

		await TestBed.configureTestingModule({
			imports: [PaginationButtonsComponent],
			providers: [{ provide: WordsService, useValue: mockWordsService }],
		}).compileComponents();

		fixture = TestBed.createComponent(PaginationButtonsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should update properties values on subscriptions change", () => {
		mockWordsService.page$.next(2);
		mockWordsService.maxPage$.next(2);

		expect(component.page).toBe(2);
		expect(component.maxPage).toBe(2);
		expect(component.pages).toEqual([0, 1]);
	});

	it("should call wordsService.setPage on setPage call", () => {
		component.setPage(3);

		expect(mockWordsService.setPage).toHaveBeenCalledOnceWith(3);
	});

	it("should remove subscriptions on destroy", () => {
		const unsubscribeSpy = spyOn(component["subscription"], "unsubscribe");
		component.ngOnDestroy();

		expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
	});
});
