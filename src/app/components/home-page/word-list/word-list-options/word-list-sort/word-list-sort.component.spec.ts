import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WordListSortComponent } from "./word-list-sort.component";
import { provideHttpClient } from "@angular/common/http";
import { createMockWordsService, IMockWordsService, mockWords } from "app/app.component.spec";
import { ESortTypes, WordsService } from "@services/words.service";

describe("WordListSortComponent", () => {
	let component: WordListSortComponent;
	let fixture: ComponentFixture<WordListSortComponent>;
	let mockWordsService: IMockWordsService;

	beforeEach(async () => {
		mockWordsService = createMockWordsService();

		await TestBed.configureTestingModule({
			imports: [WordListSortComponent],
			providers: [provideHttpClient(), { provide: WordsService, useValue: mockWordsService }],
		}).compileComponents();

		fixture = TestBed.createComponent(WordListSortComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should set hasNotlearningWords field depending on subscription", () => {
		mockWordsService.filteredWordList$.next(mockWords);

		expect(component.hasNotLearningWords).toBeTrue();
	});

	it("should call wordsService.sortWordList on sortWordList call", () => {
		const selectElement = document.createElement("select");
		selectElement.value = ESortTypes.DefinitionASC;
		component.sortWordList(selectElement);

		expect(mockWordsService.sortWordList).toHaveBeenCalledOnceWith(selectElement.value);
	});

	it("should destroy subscription on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");
		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
