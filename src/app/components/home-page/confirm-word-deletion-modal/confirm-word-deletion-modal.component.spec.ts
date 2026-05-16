import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConfirmWordDeletionModalComponent } from "./confirm-word-deletion-modal.component";
import { provideHttpClient } from "@angular/common/http";
import { ModalComponent } from "@components/utils/modal/modal.component";
import { createMockModalService, IMockModalService } from "@services/modal/modal.service.mock";
import { createMockWordsService, IMockWordsService } from "@services/words/words.service.mock";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { WordsService } from "@services/words/words.service";
import { provideTranslateService } from "@ngx-translate/core";

describe("ConfirmWordDeletionModalComponent", () => {
	let component: ConfirmWordDeletionModalComponent;
	let fixture: ComponentFixture<ConfirmWordDeletionModalComponent>;
	let mockModalService: IMockModalService;
	let mockWordsService: IMockWordsService;

	beforeEach(async () => {
		mockModalService = createMockModalService();
		mockWordsService = createMockWordsService();

		await TestBed.configureTestingModule({
			imports: [ConfirmWordDeletionModalComponent, ModalComponent],
			providers: [
				provideHttpClient(),
				{ provide: ModalService, useValue: mockModalService },
				{ provide: WordsService, useValue: mockWordsService },
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

	it("should hide word deletion modal on closeModal call", () => {
		component.closeModal();

		expect(mockModalService.toggleModal).toHaveBeenCalledOnceWith(
			EModalType.WordDeletion,
			false,
		);
	});

	it("should call wordsService.remove on confirmDeletion call when wordId is set", () => {
		component.wordId = 1;
		component.confirmDeletion();

		expect(mockWordsService.remove).toHaveBeenCalledOnceWith(1);
	});

	it("should call wordsService.removeMany on confirmDeletion call when wordId is not set", () => {
		component.wordId = null;
		component.confirmDeletion();

		expect(mockWordsService.removeMany).toHaveBeenCalledTimes(1);
	});
});
