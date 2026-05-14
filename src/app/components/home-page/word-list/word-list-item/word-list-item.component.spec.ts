import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WordListItemComponent } from "./word-list-item.component";
import { provideHttpClient } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SentenceCasePipe } from "@pipes/sentence-case.pipe";
import {
	createMockModalService,
	createMockWebSpeechService,
	IMockModalService,
	IMockWebSpeechService,
} from "app/app.component.spec";
import {
	createMockWordsService,
	IMockWordsService,
	mockWords,
} from "@services/words/words.service.mock";
import { createMockWordsFormService, IMockWordsFormService } from "@services/words-form/words-form.service.mock";
import { WordsFormService } from "@services/words-form/words-form.service";
import { WebSpeechService } from "@services/web-speech/web-speech.service";
import { WordsService } from "@services/words/words.service";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { provideTranslateService } from "@ngx-translate/core";

describe("WordListItemComponent", () => {
	let component: WordListItemComponent;
	let fixture: ComponentFixture<WordListItemComponent>;
	let mockWordsFormService: IMockWordsFormService;
	let mockWebSpeechService: IMockWebSpeechService;
	let mockWordsService: IMockWordsService;
	let mockModalService: IMockModalService;

	beforeEach(async () => {
		mockWordsFormService = createMockWordsFormService();
		mockWebSpeechService = createMockWebSpeechService();
		mockWordsService = createMockWordsService();
		mockModalService = createMockModalService();

		await TestBed.configureTestingModule({
			imports: [WordListItemComponent, SentenceCasePipe],
			providers: [
				provideHttpClient(),
				{ provide: WordsFormService, useValue: mockWordsFormService },
				{ provide: WebSpeechService, useValue: mockWebSpeechService },
				{ provide: WordsService, useValue: mockWordsService },
				{ provide: ModalService, useValue: mockModalService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(WordListItemComponent);
		component = fixture.componentInstance;
		component.word = mockWords[0];
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should call webSpeechService.readText method on readWord call", () => {
		component.readWord();

		expect(mockWebSpeechService.readText).toHaveBeenCalledOnceWith(component.word.name);
	});

	it("should call webSpeechService.readText method on readWord definition call", () => {
		component.readWordDefinition();

		expect(mockWebSpeechService.readText).toHaveBeenCalledOnceWith(component.word.definition);
	});

	it("should call services methods on editWord method call", () => {
		const toggleDropdownMenuSpy = spyOn(component, "toggleDropdownMenu");
		component.editWord();

		expect(mockModalService.toggleModal).toHaveBeenCalledOnceWith(EModalType.WordAdding, true);
		expect(mockWordsFormService.setupForEditing).toHaveBeenCalledOnceWith(component.word);
		expect(toggleDropdownMenuSpy).toHaveBeenCalledTimes(1);
	});

	it("should call wordsService.toggleIsLearning on toggleIsLearning method call", () => {
		component.toggleIsLearning();

		expect(mockWordsService.toggleIsLearning).toHaveBeenCalledOnceWith(component.word.id);
	});

	it("should toggle dropdown menu", () => {
		expect(component.isDropdownOpen).toBeFalse();
		component.toggleDropdownMenu();

		expect(component.isDropdownOpen).toBeTrue();
	});

	it("should call services methods on deleteWord method call", () => {
		const toggleDropdownMenuSpy = spyOn(component, "toggleDropdownMenu");
		component.deleteWord();

		expect(mockModalService.toggleModal).toHaveBeenCalledOnceWith(
			EModalType.WordDeletion,
			true,
		);
		expect(toggleDropdownMenuSpy).toHaveBeenCalledTimes(1);
	});
});
