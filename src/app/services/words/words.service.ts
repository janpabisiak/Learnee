import { inject, Injectable } from "@angular/core";
import { EToasterTypes } from "@components/utils/toaster-container/toaster/toaster.component";
import { TranslateService } from "@ngx-translate/core";
import { ToasterService } from "@services/toaster/toaster.service";
import { IWord } from "../../types/word.interface";
import { WordsResourceService } from "@services/words-resource/words-resource.service";
import { WordsStore } from "../../stores/words.store";
import { ESortTypes } from "@services/words-options/words-options.service";

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

	setSortType(value: ESortTypes) {
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
				duration: 5,
			});

			return;
		}

		const newWord: IWord = {
			id: wordList.length,
			name: word,
			definition,
			isLearning: true,
		};

		const updatedWordList = [...wordList, newWord];
		this.updateWordList(updatedWordList);

		this.toasterService.addToaster({
			type: EToasterTypes.Success,
			content: this.translateService.instant("toaster.success.word.added"),
			duration: 5,
		});
	}

	getRandomLearningWord() {
		const learningWords = this.wordsStore.wordListValue.filter((w) => w.isLearning);

		const randomIndex = Math.floor(Math.random() * learningWords.length);
		return learningWords[randomIndex];
	}

	remove(wordId: number) {
		const updatedWordList = this.wordsStore.wordListValue.filter((w) => w.id !== wordId);
		this.updateWordList(updatedWordList);

		this.toasterService.addToaster({
			type: EToasterTypes.Success,
			content: this.translateService.instant("toaster.success.word.deleted"),
			duration: 5,
		});

		this.wordsStore.setWordToDeleteId(null);
	}

	removeMany() {
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
			duration: 5,
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
			duration: 5,
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

	unselectAll() {
		this.wordsStore.setSelectedIds([]);
	}
}
