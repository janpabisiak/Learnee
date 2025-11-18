import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WordListItemComponent } from "./word-list-item.component";
import { provideHttpClient } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SentenceCasePipe } from "@pipes/sentence-case.pipe";
import {
	createMockAddWordFormService,
	createMockConfirmWordDeletionService,
	createMockModalService,
	createMockWebSpeechService,
	createMockWordsService,
	IMockAddWordFormService,
	IMockMockConfirmWordDeletionService,
	IMockModalService,
	IMockWebSpeechService,
	IMockWordsService,
	mockWords,
} from "app/app.component.spec";
import { AddWordFormService } from "@services/add-edit-word-form/add-edit-word-form.service";
import { WebSpeechService } from "@services/web-speech/web-speech.service";
import { WordsService } from "@services/words/words.service";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { ConfirmWordDeletionService } from "@services/confirm-word-deletion/confirm-word-deletion.service";
import { provideTranslateService } from "@ngx-translate/core";

describe("WordListItemComponent", () => {
	let component: WordListItemComponent;
	let fixture: ComponentFixture<WordListItemComponent>;
	let mockAddWordFormService: IMockAddWordFormService;
	let mockWebSpeechService: IMockWebSpeechService;
	let mockWordsService: IMockWordsService;
	let mockModalService: IMockModalService;
	let mockConfirmWordDeletionService: IMockMockConfirmWordDeletionService;

	beforeEach(async () => {
		mockAddWordFormService = createMockAddWordFormService();
		mockWebSpeechService = createMockWebSpeechService();
		mockWordsService = createMockWordsService();
		mockModalService = createMockModalService();
		mockConfirmWordDeletionService = createMockConfirmWordDeletionService();

		await TestBed.configureTestingModule({
			imports: [WordListItemComponent, SentenceCasePipe],
			providers: [
				provideHttpClient(),
				{ provide: AddWordFormService, useValue: mockAddWordFormService },
				{ provide: WebSpeechService, useValue: mockWebSpeechService },
				{ provide: WordsService, useValue: mockWordsService },
				{ provide: ModalService, useValue: mockModalService },
				{ provide: ConfirmWordDeletionService, useValue: mockConfirmWordDeletionService },
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

	it("should call webSpeechService.readText method on readWordDefinition call", () => {
		component.readWordDefinition();

		expect(mockWebSpeechService.readText).toHaveBeenCalledOnceWith(component.word.definition);
	});

	it("should call services methods on editWord method call", () => {
		const toggleDropdownMenuSpy = spyOn(component, "toggleDropdownMenu");
		component.editWord();

		expect(mockModalService.toggleModal).toHaveBeenCalledOnceWith(EModalType.WordAdding, true);
		expect(mockAddWordFormService.setupForEditing).toHaveBeenCalledOnceWith(component.word);
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
			true
		);
		expect(mockConfirmWordDeletionService.word).toEqual(component.word);
		expect(toggleDropdownMenuSpy).toHaveBeenCalledTimes(1);
	});
});
