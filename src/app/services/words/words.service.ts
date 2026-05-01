import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { IWord } from "../../types/word.interface";
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, switchMap, take } from "rxjs";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { ToasterService } from "@services/toaster/toaster.service";
import { EToasterTypes } from "@components/utils/toaster-container/toaster/toaster.component";
import { PaginationService } from "@services/pagination/pagination.service";
import { SettingsService } from "@services/settings/settings.service";

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
	private wordsOfTheDay = new BehaviorSubject<IWord[]>([]);
	private searchQuery = "";

	wordList$ = this.wordList.asObservable();
	sortedWordList$ = this.sortedWordList.asObservable();
	filteredWordList$ = this.filteredWordList.asObservable();
	paginatedWordList$ = this.paginatedWordList.asObservable();
	wordsOfTheDay$ = this.wordsOfTheDay.asObservable();

	constructor(
		private http: HttpClient,
		private localStorageService: LocalStorageService,
		private toasterService: ToasterService,
		private paginationService: PaginationService,
		private settingsService: SettingsService,
	) {
		this.getWordsOfTheDay();

		const wordList = this.localStorageService.loadData("word-list");
		if (wordList) {
			this.wordList.next(wordList);
			this.sortWordList();

			this.filteredWordList.next(wordList);
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

		this.sortedWordList.next(updatedWordList);
		this.filteredWordList.next(updatedWordList);
		this.filterWordList(this.searchQuery);
		this.paginateWordList();
	}

	sortWordList(sortType: ESortTypes = ESortTypes.NameASC) {
		switch (sortType) {
			case ESortTypes.NameDESC: {
				const sortedWordList = this.wordList.value.sort((a, b) =>
					b.name.localeCompare(a.name),
				);
				this.sortedWordList.next(sortedWordList);
				this.filterWordList(this.searchQuery);
				break;
			}
			case ESortTypes.DefinitionASC: {
				const sortedWordList = this.wordList.value.sort((a, b) =>
					a.definition.localeCompare(b.definition),
				);
				this.sortedWordList.next(sortedWordList);
				this.filterWordList(this.searchQuery);
				break;
			}
			case ESortTypes.DefinitionDESC: {
				const sortedWordList = this.wordList.value.sort((a, b) =>
					b.definition.localeCompare(a.definition),
				);
				this.sortedWordList.next(sortedWordList);
				this.filterWordList(this.searchQuery);
				break;
			}
			case ESortTypes.IsLearningASC: {
				const sortedWordList = this.wordList.value.sort(
					(a, b) => +a.isLearning - +b.isLearning,
				);
				this.sortedWordList.next(sortedWordList);
				this.filterWordList(this.searchQuery);
				break;
			}
			case ESortTypes.IsLearningDESC: {
				const sortedWordList = this.wordList.value.sort(
					(a, b) => +b.isLearning - +a.isLearning,
				);
				this.sortedWordList.next(sortedWordList);
				this.filterWordList(this.searchQuery);
				break;
			}
			default: {
				const sortedWordList = this.wordList.value.sort((a, b) =>
					a.name.localeCompare(b.name),
				);
				this.sortedWordList.next(sortedWordList);
				this.filterWordList(this.searchQuery);
				break;
			}
		}
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
				content: "This word is already on your wordlist",
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
			content: "Word successfully added",
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
			content: "Word successfully deleted",
			duration: 5,
		});
	}

	purgeWordList() {
		this.updateWordList([]);

		this.toasterService.addToaster({
			type: EToasterTypes.Success,
			content: "Words successfully deleted",
			duration: 5,
		});
	}

	editWord(wordId: number, word: string, definition: string) {
		const updatedWordList = [...this.wordList.value].map((w) =>
			w.id === wordId ? { ...w, name: word, definition } : w,
		);

		this.updateWordList(updatedWordList);

		this.toasterService.addToaster({
			type: EToasterTypes.Success,
			content: "Word successfully edited",
			duration: 5,
		});
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

export enum ESortTypes {
	NameASC = "nameASC",
	NameDESC = "nameDESC",
	DefinitionASC = "definitionASC",
	DefinitionDESC = "definitionDESC",
	IsLearningASC = "isLearningASC",
	IsLearningDESC = "isLearningDESC",
}
