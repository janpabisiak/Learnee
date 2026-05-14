import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { IWord } from "../../types/word.interface";
import {
	BehaviorSubject,
	catchError,
	combineLatest,
	map,
	Observable,
	of,
	switchMap,
	take,
} from "rxjs";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { ToasterService } from "@services/toaster/toaster.service";
import { EToasterTypes } from "@components/utils/toaster-container/toaster/toaster.component";
import { PaginationService } from "@services/pagination/pagination.service";
import { SettingsService } from "@services/settings/settings.service";
import { TranslateService } from "@ngx-translate/core";

export enum ESortTypes {
	NameASC = "nameASC",
	NameDESC = "nameDESC",
	DefinitionASC = "definitionASC",
	DefinitionDESC = "definitionDESC",
	IsLearningASC = "isLearningASC",
	IsLearningDESC = "isLearningDESC",
	IdASC = "idASC",
	IdDESC = "idDESC",
}

const sortOptions: Record<ESortTypes, (wordList: IWord[]) => IWord[]> = {
	[ESortTypes.NameASC]: (wordList) => [...wordList].sort((a, b) => a.name.localeCompare(b.name)),
	[ESortTypes.NameDESC]: (wordList) => [...wordList].sort((a, b) => b.name.localeCompare(a.name)),
	[ESortTypes.DefinitionASC]: (wordList) =>
		[...wordList].sort((a, b) => a.definition.localeCompare(b.definition)),
	[ESortTypes.DefinitionDESC]: (wordList) =>
		[...wordList].sort((a, b) => b.definition.localeCompare(a.definition)),
	[ESortTypes.IsLearningASC]: (wordList) =>
		[...wordList].sort((a, b) => +a.isLearning - +b.isLearning),
	[ESortTypes.IsLearningDESC]: (wordList) =>
		[...wordList].sort((a, b) => +b.isLearning - +a.isLearning),
	[ESortTypes.IdASC]: (wordList) => [...wordList].sort((a, b) => a.id - b.id),
	[ESortTypes.IdDESC]: (wordList) => [...wordList].sort((a, b) => b.id - a.id),
};

@Injectable({
	providedIn: "root",
})
export class WordsService {
	private apiUrl = environment.apiUrl;
	private rssUrl = environment.rssUrl;
	private wordList = new BehaviorSubject<IWord[]>([]);
	private sortedWordList = new BehaviorSubject<IWord[]>([]);
	private filteredWordList = new BehaviorSubject<IWord[]>([]);
	private paginatedWordList = new BehaviorSubject<IWord[]>([]);
	private selectedIds = new BehaviorSubject<number[]>([]);
	private hasSelectedIds = new BehaviorSubject<boolean>(false);
	private wordToDeleteId = new BehaviorSubject<number | null>(null);
	private wordsOfTheDay = new BehaviorSubject<IWord[]>([]);
	private currentSortType = new BehaviorSubject<ESortTypes>(ESortTypes.IdDESC);
	private searchQuery = "";

	wordList$ = this.wordList.asObservable();
	sortedWordList$ = this.sortedWordList.asObservable();
	filteredWordList$ = this.filteredWordList.asObservable();
	paginatedWordList$ = this.paginatedWordList.asObservable();
	selectedIds$ = this.selectedIds.asObservable();
	hasSelectedIds$ = this.hasSelectedIds.asObservable();
	wordToDeleteId$ = this.wordToDeleteId.asObservable();
	wordsOfTheDay$ = this.wordsOfTheDay.asObservable();
	currentSortType$ = this.currentSortType.asObservable();

	constructor(
		private http: HttpClient,
		private localStorageService: LocalStorageService,
		private toasterService: ToasterService,
		private paginationService: PaginationService,
		private settingsService: SettingsService,
		private translateService: TranslateService,
	) {
		this.getWordsOfTheDay();

		const wordList = this.localStorageService.loadData("word-list");
		if (wordList) {
			this.wordList.next(wordList);
			this.sortWordList();
		}

		combineLatest([
			this.paginationService.page$,
			this.paginationService.wordsPerPage$,
		]).subscribe(() => {
			this.paginateWordList();
		});
	}

	private getResponseFromWordAPI(word: string) {
		return this.http.get(this.apiUrl + word);
	}

	private saveData(wordList: IWord[]) {
		this.localStorageService.saveData("word-list", wordList);
	}

	private updateWordList(updatedWordList: IWord[]) {
		this.wordList.next(updatedWordList);
		this.saveData(updatedWordList);

		this.sortWordList();
	}

	sortWordList() {
		const currentSortType = this.currentSortType.value;
		const wordList = this.wordList.value;
		const sortedWordList = sortOptions[currentSortType](wordList);
		this.sortedWordList.next(sortedWordList);
		this.filterWordList(this.searchQuery);
	}

	filterWordList(query: string) {
		this.searchQuery = query;

		const sortedWordList = this.sortedWordList.value;
		const filteredWordList = sortedWordList.filter(
			(w) =>
				w.name.toLowerCase().includes(query) || w.definition.toLowerCase().includes(query),
		);

		this.filteredWordList.next(filteredWordList);
		this.paginateWordList();
	}

	paginateWordList() {
		this.paginatedWordList.next(
			this.paginationService.paginateWordList(this.filteredWordList.value),
		);
	}

	fetchWordDefinition$(word: string): Observable<string> {
		return this.settingsService.isFetchWordDefinitionEnabled$.pipe(
			take(1),
			switchMap((isEnabled) => {
				if (!isEnabled) return of("");

				return this.getResponseFromWordAPI(word).pipe(
					take(1),
					map(
						(response: any) =>
							response.entries?.[0]?.lexemes?.[0]?.senses?.[0]?.definition ?? "",
					),
				);
			}),
		);
	}

	addWord(word: string, definition: string) {
		const wordList = this.wordList.value;
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
		const learningWords = this.wordList.value.filter((w) => w.isLearning);

		const randomIndex = Math.floor(Math.random() * learningWords.length);
		return learningWords[randomIndex];
	}

	removeWord(wordId: number) {
		const updatedWordList = this.wordList.value.filter((w) => w.id !== wordId);
		this.updateWordList(updatedWordList);

		this.toasterService.addToaster({
			type: EToasterTypes.Success,
			content: this.translateService.instant("toaster.success.word.deleted"),
			duration: 5,
		});

		this.wordToDeleteId.next(null);
	}

	removeManyWords() {
		if (this.hasSelectedIds.value) {
			const updatedWordList = this.wordList.value.filter(
				(word) => !this.selectedIds.value.includes(word.id),
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

		this.selectedIds.next([]);
		this.hasSelectedIds.next(false);
	}

	editWord(wordId: number, word: string, definition: string) {
		const updatedWordList = [...this.wordList.value].map((w) =>
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
		this.wordToDeleteId.next(wordId);
	}

	toggleIsLearning(wordId: number) {
		const updatedWordList = [...this.wordList.value].map((w) => {
			if (w.id !== wordId) return w;
			return {
				...w,
				isLearning: !w.isLearning,
			};
		});

		this.updateWordList(updatedWordList);
	}

	toggleSelection(wordId: number) {
		const selectedIds = this.selectedIds.value;
		const hasWordSelected = selectedIds.includes(wordId);
		let updatedWordList: number[] = [];

		if (hasWordSelected) {
			updatedWordList = selectedIds.filter((id) => id !== wordId);
		} else {
			updatedWordList = [...selectedIds, wordId];
		}

		this.selectedIds.next(updatedWordList);
		this.hasSelectedIds.next(!!updatedWordList.length);
	}

	unselectAll() {
		this.selectedIds.next([]);
		this.hasSelectedIds.next(false);
	}

	changeSortType(value: ESortTypes) {
		this.currentSortType.next(value);
		this.sortWordList();
	}

	private getWordsOfTheDay() {
		const date = new Date();
		date.setUTCHours(0, 0, 0, 0);

		if (
			this.localStorageService.loadData("wotd-fetched-date") ===
			date.toISOString().split("T")[0]
		) {
			const words = this.localStorageService.loadData("wotd-words") as IWord[];

			this.wordsOfTheDay.next(words);
		}

		this.http
			.get(this.rssUrl, { responseType: "text" })
			.pipe(
				take(1),
				map((response: string) => {
					const data = new DOMParser().parseFromString(response, "application/xml");
					const items = Array.from(data.querySelectorAll("item"));

					const words = items
						.map((item, i) => {
							const [word, definition]: string[] = [
								item.querySelector("title")?.textContent || "",
								item.querySelector("shortdef")?.textContent || "",
							];

							if (!word || !definition) return undefined;

							return {
								id: i,
								name: word,
								definition,
								isLearning: false,
							};
						})
						.filter((word): word is IWord => word !== undefined);

					this.wordsOfTheDay.next(words);
					this.localStorageService.saveData("wotd-words", words);
					this.localStorageService.saveData(
						"wotd-fetched-date",
						date.toISOString().split("T")[0],
					);
				}),
				catchError((error: HttpErrorResponse) => {
					console.error(error);
					return of([]);
				}),
			)
			.subscribe();
	}
}
