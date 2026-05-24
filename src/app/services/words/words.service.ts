import { inject, Injectable } from "@angular/core";
import { DEFAULT_TOASTER_DURATION, EToasterTypes } from "@shared/constants/toaster.constants";
import { TranslateService } from "@ngx-translate/core";
import { ToasterService } from "@services/toaster/toaster.service";
import { IWord } from "../../types/word.interface";
import { WordsResourceService } from "@services/words-resource/words-resource.service";
import { WordsStore } from "../../stores/words/words.store";
import { EWordSortTypes } from "@services/words-options/words-options.service";
import { map, take } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class WordsService {
	private toasterService = inject(ToasterService);
	private translateService = inject(TranslateService);
	private wordsStore = inject(WordsStore);
	private wordsResourceService = inject(WordsResourceService);

	wordList$ = this.wordsStore.wordList$;
	numberOfWords$ = this.wordsStore.numberOfWords$;
	numberOfFilteredWords$ = this.wordsStore.numberOfFilteredWords$;
	selectedIds$ = this.wordsStore.selectedIds$;
	hasSelectedIds$ = this.wordsStore.hasSelectedIds$;
	wordToDeleteId$ = this.wordsStore.wordToDeleteId$;
	wordsOfTheDay$ = this.wordsStore.wordsOfTheDay$;
	isWotdLoading$ = this.wordsStore.isWotdLoading$;
	sortType$ = this.wordsStore.sortType$;
	searchQuery$ = this.wordsStore.searchQuery$;
	visibleWords$ = this.wordsStore.visibleWords$;
	page$ = this.wordsStore.page$;
	maxPage$ = this.wordsStore.maxPage$;
	wordsPerPage$ = this.wordsStore.wordsPerPage$;
	resultRange$ = this.wordsStore.resultRange$;

	private saveData(wordList: IWord[]) {
		this.wordsResourceService.saveData(wordList);
	}

	private updateWordList(updatedWordList: IWord[]) {
		this.wordsStore.setWordList(updatedWordList);
		this.saveData(updatedWordList);
	}

	setSortType(value: EWordSortTypes) {
		this.wordsStore.setSortType(value);
	}

	setSearchQuery(query: string) {
		this.wordsStore.setSearchQuery(query);
	}

	setPage(page: number) {
		this.wordsStore.setPage(page);
	}

	setWordsPerPage(amount: number) {
		this.wordsStore.setWordsPerPage(amount);
	}

	fetchDefinition$(word: string) {
		return this.wordsResourceService.fetchDefinition$(word);
	}

	add(word: string, definition: string) {
		const wordList = this.wordsStore.wordListValue;
		if (wordList.some((w) => w.name === word && w.definition === definition)) {
			this.toasterService.addToaster({
				type: EToasterTypes.Error,
				content: this.translateService.instant("toaster.error.word.alreadyExists"),
				duration: DEFAULT_TOASTER_DURATION,
			});

			return;
		}

		const newWord: IWord = {
			id: wordList.length > 0 ? Math.max(...wordList.map((f) => f.id)) + 1 : 0,
			name: word,
			definition,
			isLearning: true,
		};

		const updatedWordList = [...wordList, newWord];
		this.updateWordList(updatedWordList);

		this.toasterService.addToaster({
			type: EToasterTypes.Success,
			content: this.translateService.instant("toaster.success.word.added"),
			duration: DEFAULT_TOASTER_DURATION,
		});
	}

	getRandomLearningWord() {
		const learningWords = this.wordsStore.wordListValue.filter((w) => w.isLearning);

		const randomIndex = Math.floor(Math.random() * learningWords.length);
		return learningWords[randomIndex];
	}

	delete(wordId: number) {
		const updatedWordList = this.wordsStore.wordListValue.filter((w) => w.id !== wordId);
		this.updateWordList(updatedWordList);

		this.toasterService.addToaster({
			type: EToasterTypes.Success,
			content: this.translateService.instant("toaster.success.word.deleted"),
			duration: DEFAULT_TOASTER_DURATION,
		});

		this.wordsStore.setWordToDeleteId(null);
	}

	deleteMany() {
		const selectedIds = this.wordsStore.selectedIdsValue;

		if (selectedIds.length > 0) {
			const updatedWordList = this.wordsStore.wordListValue.filter(
				(word) => !selectedIds.includes(word.id),
			);

			this.updateWordList(updatedWordList);
		} else {
			this.updateWordList([]);
		}

		this.toasterService.addToaster({
			type: EToasterTypes.Success,
			content: this.translateService.instant("toaster.success.word.manyDeleted"),
			duration: DEFAULT_TOASTER_DURATION,
		});

		this.unselectAll();
	}

	edit(wordId: number, word: string, definition: string) {
		const updatedWordList = [...this.wordsStore.wordListValue].map((w) =>
			w.id === wordId ? { ...w, name: word, definition } : w,
		);

		this.updateWordList(updatedWordList);

		this.toasterService.addToaster({
			type: EToasterTypes.Success,
			content: this.translateService.instant("toaster.success.word.edited"),
			duration: DEFAULT_TOASTER_DURATION,
		});
	}

	updateWordToDeleteId(wordId: number | null) {
		this.wordsStore.setWordToDeleteId(wordId);
	}

	toggleIsLearning(wordId: number) {
		const updatedWordList = [...this.wordsStore.wordListValue].map((w) => {
			if (w.id !== wordId) return w;
			return {
				...w,
				isLearning: !w.isLearning,
			};
		});

		this.updateWordList(updatedWordList);
	}

	toggleSelection(wordId: number) {
		const selectedIds = this.wordsStore.selectedIdsValue;
		const hasWordSelected = selectedIds.includes(wordId);
		let updatedSelection: number[] = [];

		if (hasWordSelected) {
			updatedSelection = selectedIds.filter((id) => id !== wordId);
		} else {
			updatedSelection = [...selectedIds, wordId];
		}

		this.wordsStore.setSelectedIds(updatedSelection);
	}

	selectAllVisible() {
		this.visibleWords$
			.pipe(
				take(1),
				map((words) => {
					const visibleWordIds = words.map((w) => w.id);
					return Array.from(
						new Set([...this.wordsStore.selectedIdsValue, ...visibleWordIds]),
					);
				}),
			)
			.subscribe((updatedSelectedIds) => {
				this.wordsStore.setSelectedIds(updatedSelectedIds);
			});
	}

	setIsLearningForSelected(isLearning: boolean) {
		const wordList = this.wordsStore.wordListValue;
		const selectedIds = this.wordsStore.selectedIdsValue;

		const updatedWordList = wordList.map((w) =>
			selectedIds.includes(w.id) ? { ...w, isLearning } : w,
		);
		this.updateWordList(updatedWordList);
	}

	unselectAll() {
		this.wordsStore.setSelectedIds([]);
	}
}
