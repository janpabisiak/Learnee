import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WordPaginationContainerComponent } from "./word-pagination-container.component";
import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";
import { PaginationButtonsComponent } from "@shared/pagination-buttons/pagination-buttons.component";
import { ResultsCounterComponent } from "@shared/results-counter/results-counter.component";
import { ItemsPerPageSelectorComponent } from "@shared/items-per-page-selector/items-per-page-selector.component";
import {
	createMockWordsService,
	IMockWordsService,
	mockResultRange,
	mockWords,
} from "@services/words/words.service.mock";
import { WordsService } from "@services/words/words.service";

describe("WordPaginationContainerComponent", () => {
	let component: WordPaginationContainerComponent;
	let fixture: ComponentFixture<WordPaginationContainerComponent>;
	let mockWordsService: IMockWordsService;

	beforeEach(async () => {
		mockWordsService = createMockWordsService();

		await TestBed.configureTestingModule({
			imports: [
				WordPaginationContainerComponent,
				PaginationButtonsComponent,
				ResultsCounterComponent,
				ItemsPerPageSelectorComponent,
			],
			providers: [
				provideHttpClient(),
				provideTranslateService({
					fallbackLang: "en",
				}),
				{ provide: WordsService, useValue: mockWordsService },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(WordPaginationContainerComponent);
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

	it("should update properties values on subscriptions update", () => {
		mockWordsService.resultRange$.next(mockResultRange);
		mockWordsService.numberOfFilteredWords$.next(mockWords.length);

		expect(component.resultRange).toEqual(mockResultRange);
		expect(component.numberOfWords).toBe(mockWords.length);
	});

	it("should update wordsPerPage property on subscription change", () => {
		mockWordsService.wordsPerPage$.next(20);

		expect(component.wordsPerPage).toBe(20);
	});

	it("should call wordsService.setWordsPerPage on setWordsPerPage call", () => {
		component.setWordsPerPage(10);

		expect(mockWordsService.setWordsPerPage).toHaveBeenCalledOnceWith(10);
	});

	it("should remove subscription on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");

		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
