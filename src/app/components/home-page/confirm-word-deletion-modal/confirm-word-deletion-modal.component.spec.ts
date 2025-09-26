import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConfirmWordDeletionModalComponent } from "./confirm-word-deletion-modal.component";
import { provideHttpClient } from "@angular/common/http";
import { ModalComponent } from "@components/utils/modal/modal.component";
import {
	createMockConfirmWordDeletionService,
	createMockModalService,
	createMockWordsService,
	IMockMockConfirmWordDeletionService,
	IMockModalService,
	IMockWordsService,
	mockWords,
} from "app/app.component.spec";
import { ModalService } from "@services/modal/modal.service";
import { WordsService } from "@services/words/words.service";
import { provideTranslateService } from "@ngx-translate/core";

describe("ConfirmWordDeletionModalComponent", () => {
	let component: ConfirmWordDeletionModalComponent;
	let fixture: ComponentFixture<ConfirmWordDeletionModalComponent>;
	let mockModalService: IMockModalService;
	let mockWordsService: IMockWordsService;
	let mockConfirmWordDeletionService: IMockMockConfirmWordDeletionService;

	beforeEach(async () => {
		mockModalService = createMockModalService();
		mockWordsService = createMockWordsService();
		mockConfirmWordDeletionService = createMockConfirmWordDeletionService();

		await TestBed.configureTestingModule({
			imports: [ConfirmWordDeletionModalComponent, ModalComponent],
			providers: [
				provideHttpClient(),
				{ provide: ModalService, useValue: mockModalService },
				{ provide: WordsService, useValue: mockWordsService },
				{
					provide: ConfirmWordDeletionModalComponent,
					useValue: mockConfirmWordDeletionService,
				},
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ConfirmWordDeletionModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should call modalService.toggleShowWordDeletionModal on closeModal call", () => {
		component.closeModal();

		expect(mockModalService.toggleShowWordDeletionModal).toHaveBeenCalledOnceWith(false);
	});

	it("should call wordsService.removeWord on confirmDeletion call when purgeWords is false", () => {
		component.word = mockWords[0];
		component.confirmDeletion();

		expect(mockWordsService.removeWord).toHaveBeenCalledOnceWith(component.word.id);
	});

	it("should call wordsService.purgeWordList on confirmDeletion call when purgeWords is true", () => {
		component.purgeWords = true;
		component.confirmDeletion();

		expect(mockWordsService.purgeWordList).toHaveBeenCalledTimes(1);
	});
});
