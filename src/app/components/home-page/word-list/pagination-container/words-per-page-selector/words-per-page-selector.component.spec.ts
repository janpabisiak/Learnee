import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideTranslateService } from "@ngx-translate/core";
import { PaginationService } from "@services/pagination/pagination.service";
import { createMockPaginationService, IMockPaginationService } from "app/app.component.spec";
import { WordsPerPageSelectorComponent } from "./words-per-page-selector.component";

describe("WordsPerPageSelectorComponent", () => {
	let component: WordsPerPageSelectorComponent;
	let fixture: ComponentFixture<WordsPerPageSelectorComponent>;
	let mockPaginationService: IMockPaginationService;

	beforeEach(async () => {
		mockPaginationService = createMockPaginationService();

		await TestBed.configureTestingModule({
			imports: [WordsPerPageSelectorComponent],
			providers: [
				{ provide: PaginationService, useValue: mockPaginationService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(WordsPerPageSelectorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should update wordsPerPage property on subscription change", () => {
		mockPaginationService.wordsPerPage$.next(20);

		expect(component.wordsPerPage).toBe(20);
	});

	it("should call paginationService.setWordsPerPage on setWordsPerPage call", () => {
		component.setWordsPerPage(10);

		expect(mockPaginationService.setWordsPerPage).toHaveBeenCalledOnceWith(10);
	});

	it("should remove subscription on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");

		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
