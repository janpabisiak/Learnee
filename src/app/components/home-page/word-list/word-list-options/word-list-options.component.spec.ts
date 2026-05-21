import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { createMockModalService, IMockModalService } from "@services/modal/modal.service.mock";
import { WordsService } from "@services/words/words.service";
import {
	createMockWordsService,
	IMockWordsService,
	mockWords,
} from "@services/words/words.service.mock";
import { ButtonComponent } from "@shared/components/button/button.component";
import { ItemsPurgerComponent } from "@shared/components/items-purger/items-purger.component";
import { ItemsSelectionControlButtonsComponent } from "@shared/components/items-selection-control-buttons/items-selection-control-buttons.component";
import { ItemsSortComponent } from "@shared/components/items-sort/items-sort.component";
import { SearchBarComponent } from "@shared/components/search-bar/search-bar.component";
import { WordListOptionsComponent } from "./word-list-options.component";
import { EWordSortTypes } from "@services/words-options/words-options.service";

describe("WordListOptionsComponent", () => {
	let component: WordListOptionsComponent;
	let fixture: ComponentFixture<WordListOptionsComponent>;
	let mockModalService: IMockModalService;
	let mockWordsService: IMockWordsService;

	beforeEach(async () => {
		mockModalService = createMockModalService();
		mockWordsService = createMockWordsService();

		await TestBed.configureTestingModule({
			imports: [
				WordListOptionsComponent,
				SearchBarComponent,
				ItemsSortComponent,
				ItemsPurgerComponent,
				ItemsSelectionControlButtonsComponent,
				ButtonComponent,
			],
			providers: [
				provideHttpClient(),
				{ provide: ModalService, useValue: mockModalService },
				{ provide: WordsService, useValue: mockWordsService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(WordListOptionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should show word deletion modal and set purgeWords on openModal call", () => {
		component.openDeletionModal();

		expect(mockModalService.toggleModal).toHaveBeenCalledOnceWith(
			EModalType.WordDeletion,
			true,
		);
	});

	it("should call wordsService.setSearchQuery on search method call", () => {
		component.search("test");

		expect(mockWordsService.setSearchQuery).toHaveBeenCalledOnceWith("test");
	});

	it("should set hasNotlearningWords field depending on subscription", () => {
		mockWordsService.wordList$.next(mockWords);

		expect(component.hasNotLearningWords).toBeTrue();
	});

	it("should call wordsService.setSortType on changeSortType call", () => {
		const selectElement = document.createElement("select");
		selectElement.value = EWordSortTypes.DefinitionASC;
		component.changeSortType(selectElement.value);

		expect(mockWordsService.setSortType).toHaveBeenCalledOnceWith(
			selectElement.value as EWordSortTypes,
		);
	});

	it("should destroy subscription on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");
		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
