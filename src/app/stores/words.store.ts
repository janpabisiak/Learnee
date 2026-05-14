import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, map } from "rxjs";
import { IWord } from "../types/word.interface";
import { ESortTypes, WordsOptionsService } from "@services/words-options/words-options.service";

@Injectable({
	providedIn: "root",
})
export class WordsStore {
	private wordsOptionsService = inject(WordsOptionsService);

	private wordList = new BehaviorSubject<IWord[]>([]);
	private numberOfFilteredWords = new BehaviorSubject<number>(0);
	private selectedIds = new BehaviorSubject<number[]>([]);
	private wordToDeleteId = new BehaviorSubject<number | null>(null);
	private wordsOfTheDay = new BehaviorSubject<IWord[]>([]);
	private sortType = new BehaviorSubject<ESortTypes>(ESortTypes.IdDESC);
	private searchQuery = new BehaviorSubject<string>("");
	private page = new BehaviorSubject<number>(1);
	private wordsPerPage = new BehaviorSubject<number>(10);
	private maxPage = new BehaviorSubject<number>(1);

	wordList$ = this.wordList.asObservable();
	numberOfWords$ = this.wordList.pipe(map((wordList) => wordList.length));
	numberOfFilteredWords$ = this.numberOfFilteredWords.asObservable();
	selectedIds$ = this.selectedIds.asObservable();
	hasSelectedIds$ = this.selectedIds.pipe(map((ids) => ids.length > 0));
	wordToDeleteId$ = this.wordToDeleteId.asObservable();
	wordsOfTheDay$ = this.wordsOfTheDay.asObservable();
	sortType$ = this.sortType.asObservable();
	searchQuery$ = this.searchQuery.asObservable();
	page$ = this.page.asObservable();
	wordsPerPage$ = this.wordsPerPage.asObservable();
	maxPage$ = this.maxPage.asObservable();

	filteredWords$ = combineLatest([this.wordList$, this.sortType$, this.searchQuery$]).pipe(
		map(([wordList, sortType, searchQuery]) => {
			let result = wordList;
			result = this.wordsOptionsService.sort(result, sortType);
			if (searchQuery) {
				result = this.wordsOptionsService.filter(result, searchQuery);
			}
			this.numberOfFilteredWords.next(result.length);
			return result;
		}),
	);

	resultRange$ = combineLatest([this.page$, this.wordsPerPage$, this.numberOfFilteredWords$]).pipe(
		map(([page, wordsPerPage, count]) => ({
			start: (page - 1) * wordsPerPage,
			end: Math.min((page - 1) * wordsPerPage + wordsPerPage, count),
		})),
	);

	maxPageCalculated$ = combineLatest([this.numberOfFilteredWords$, this.wordsPerPage$]).pipe(
		map(([count, perPage]) => {
			const max = Math.ceil(count / perPage) || 1;
			if (this.page.value > max) {
				this.page.next(max);
			}
			this.maxPage.next(max);
			return max;
		}),
	);

	visibleWords$ = combineLatest([this.filteredWords$, this.resultRange$, this.maxPageCalculated$]).pipe(
		map(([filteredWords, resultRange]) => {
			return this.wordsOptionsService.paginate(filteredWords, resultRange);
		}),
	);

	get wordListValue() {
		return this.wordList.value;
	}

	setWordList(value: IWord[]) {
		this.wordList.next(value);
	}

	get selectedIdsValue() {
		return this.selectedIds.value;
	}

	setSelectedIds(value: number[]) {
		this.selectedIds.next(value);
	}

	get wordToDeleteIdValue() {
		return this.wordToDeleteId.value;
	}

	setWordToDeleteId(value: number | null) {
		this.wordToDeleteId.next(value);
	}

	setWordsOfTheDay(value: IWord[]) {
		this.wordsOfTheDay.next(value);
	}

	setSortType(value: ESortTypes) {
		this.sortType.next(value);
	}

	setSearchQuery(value: string) {
		this.searchQuery.next(value);
	}

	setNumberOfFilteredWords(value: number) {
		this.numberOfFilteredWords.next(value);
	}

	setPage(value: number) {
		return value < 1 || value > this.maxPage.value ? this.page.next(1) : this.page.next(value);
	}

	setWordsPerPage(value: number) {
		this.wordsPerPage.next(value);
	}
}
