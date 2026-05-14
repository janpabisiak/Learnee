import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideTranslateService } from "@ngx-translate/core";
import { WordsService } from "@services/words/words.service";
import { createMockWordsService, IMockWordsService } from "@services/words/words.service.mock";
import { WordsPerPageSelectorComponent } from "./words-per-page-selector.component";

describe("WordsPerPageSelectorComponent", () => {
	let component: WordsPerPageSelectorComponent;
	let fixture: ComponentFixture<WordsPerPageSelectorComponent>;
	let mockWordsService: IMockWordsService;

	beforeEach(async () => {
		mockWordsService = createMockWordsService();

		await TestBed.configureTestingModule({
			imports: [WordsPerPageSelectorComponent],
			providers: [
				{ provide: WordsService, useValue: mockWordsService },
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
