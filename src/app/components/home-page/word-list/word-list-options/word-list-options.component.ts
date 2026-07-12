import { Component } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { ModalService } from "@services/modal/modal.service";
import { EWordSortTypes } from "@services/words-options/words-options.service";
import { WordsService } from "@services/words/words.service";
import { ButtonComponent } from "@shared/components/button/button.component";
import { ItemsPurgerComponent } from "@shared/components/items-purger/items-purger.component";
import { ItemsSelectionControlButtonsComponent } from "@shared/components/items-selection-control-buttons/items-selection-control-buttons.component";
import { ItemsSortComponent } from "@shared/components/items-sort/items-sort.component";
import { SearchBarComponent } from "@shared/components/search-bar/search-bar.component";
import { EModalType } from "@shared/constants/modal.constants";
import { commonSortOptionsTranslationKeys } from "@shared/constants/sorting.constants";
import { AutoCloseDirective } from "app/directives/auto-close.directive";
import { Subject, takeUntil } from "rxjs";

const sortOptionsTranslationKeys: Record<EWordSortTypes, string> = {
	...commonSortOptionsTranslationKeys,
	[EWordSortTypes.DefinitionASC]: "wordlist.sort.definitionAsc",
	[EWordSortTypes.DefinitionDESC]: "wordlist.sort.definitionDesc",
	[EWordSortTypes.IsLearningASC]: "wordlist.sort.learningAsc",
	[EWordSortTypes.IsLearningDESC]: "wordlist.sort.learningDesc",
};

@Component({
	selector: "app-word-list-options",
	imports: [
		SearchBarComponent,
		ItemsSortComponent,
		ItemsPurgerComponent,
		ItemsSelectionControlButtonsComponent,
		TranslatePipe,
		ButtonComponent,
		AutoCloseDirective,
	],
	templateUrl: "./word-list-options.component.html",
})
export class WordListOptionsComponent {
	hasSelectedWords = false;
	numberOfSelectedWords = 0;
	hasAllVisibleSelected = false;
	hasMultiplePages = false;
	isDropdownOpen = false;
	hasNotLearningWords = false;
	sortOptions: { type: string; translationKey: string }[] = [];
	currentSortOption: EWordSortTypes = EWordSortTypes.IdDESC;
	private destroy$ = new Subject<void>();

	constructor(
		private modalService: ModalService,
		private wordsService: WordsService,
	) {}

	ngOnInit() {
		this.wordsService.selectedIds$.pipe(takeUntil(this.destroy$)).subscribe((selectedIds) => {
			this.hasSelectedWords = selectedIds.length > 0;
			this.numberOfSelectedWords = selectedIds.length;
		});

		this.wordsService.sortType$.pipe(takeUntil(this.destroy$)).subscribe((sortType) => {
			this.currentSortOption = sortType;
		});

		this.wordsService.wordList$.pipe(takeUntil(this.destroy$)).subscribe((wordList) => {
			const hasNotLearningWords = wordList.some((w) => !w.isLearning);
			const isLearningSortTypes = [
				EWordSortTypes.IsLearningASC,
				EWordSortTypes.IsLearningDESC,
			];

			this.hasNotLearningWords = hasNotLearningWords;
			this.sortOptions = Object.entries(sortOptionsTranslationKeys)
				.map(([type, translationKey]) => ({
					type,
					translationKey,
				}))
				.filter(
					(st) =>
						hasNotLearningWords ||
						!isLearningSortTypes.includes(st.type as EWordSortTypes),
				);
		});

		this.wordsService.hasAllVisibleSelected$
			.pipe(takeUntil(this.destroy$))
			.subscribe((hasAllVisibleSelected) => {
				this.hasAllVisibleSelected = hasAllVisibleSelected;
			});

		this.wordsService.maxPage$.pipe(takeUntil(this.destroy$)).subscribe((maxPage) => {
			this.hasMultiplePages = maxPage > 1;
		});
	}

	openDeletionModal() {
		this.modalService.toggleModal(EModalType.WordDeletion, true);
	}

	search(value: string) {
		this.wordsService.setSearchQuery(value);
	}

	selectAllVisible() {
		if (!this.hasAllVisibleSelected) {
			this.wordsService.selectAllVisible();
		} else {
			this.wordsService.selectAll();
		}
	}

	unselectAll() {
		this.wordsService.unselectAll();
	}

	toggleDropdown() {
		this.isDropdownOpen = !this.isDropdownOpen;
	}

	setIsLearningForSelected(isLearning: boolean) {
		this.wordsService.setIsLearningForSelected(isLearning);
		this.toggleDropdown();
	}

	changeSortType(value: string) {
		this.wordsService.setSortType(value as EWordSortTypes);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
