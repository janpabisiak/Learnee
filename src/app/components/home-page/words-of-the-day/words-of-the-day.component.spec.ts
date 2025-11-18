import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WordsOfTheDayComponent } from "./words-of-the-day.component";
import { provideHttpClient } from "@angular/common/http";
import { WotdItemComponent } from "./wotd-item/wotd-item.component";
import { ButtonComponent } from "@components/utils/button/button.component";
import {
	createMockAddWordFormService,
	createMockModalService,
	createMockWordsService,
	IMockAddWordFormService,
	IMockModalService,
	IMockWordsService,
	mockWords,
} from "app/app.component.spec";
import { WordsService } from "@services/words/words.service";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { AddWordFormService } from "@services/add-edit-word-form/add-edit-word-form.service";
import { provideTranslateService } from "@ngx-translate/core";

describe("WordsOfTheDayComponent", () => {
	let component: WordsOfTheDayComponent;
	let fixture: ComponentFixture<WordsOfTheDayComponent>;
	let mockWordsService: IMockWordsService;
	let mockModalService: IMockModalService;
	let mockAddWordFormService: IMockAddWordFormService;

	beforeEach(async () => {
		mockWordsService = createMockWordsService();
		mockModalService = createMockModalService();
		mockAddWordFormService = createMockAddWordFormService();

		await TestBed.configureTestingModule({
			imports: [WordsOfTheDayComponent, WotdItemComponent, ButtonComponent],
			providers: [
				provideHttpClient(),
				{ provide: WordsService, useValue: mockWordsService },
				{ provide: ModalService, useValue: mockModalService },
				{ provide: AddWordFormService, useValue: mockAddWordFormService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(WordsOfTheDayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should update wordsOfTheDay property value depending on subscription", () => {
		mockWordsService.wordsOfTheDay$.next(mockWords);

		expect(component.wordsOfTheDay).toEqual(mockWords);
	});

	it("should update currentWordId property value on nextWord call when NOT last word in array", () => {
		component.currentWordId = 0;
		component.nextWord();

		expect(component.currentWordId).toBe(1);
	});

	it("should set currentWordId property value to 0 on nextWord call when last word in array", () => {
		component.wordsOfTheDay = mockWords;
		component.currentWordId = 1;
		component.nextWord();

		expect(component.currentWordId).toBe(0);
	});

	it("should call services methods on addWord call", () => {
		component.wordsOfTheDay = mockWords;
		component.currentWordId = 1;
		component.addWord();

		expect(mockModalService.toggleModal).toHaveBeenCalledOnceWith(EModalType.WordAdding, true);
		expect(mockAddWordFormService.setupForEditing).toHaveBeenCalledOnceWith({
			...mockWords[1],
			id: 0,
			toBeAdded: true,
		});
	});

	it("should remove subscription on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");

		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
