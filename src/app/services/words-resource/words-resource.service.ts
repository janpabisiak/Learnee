import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { DestroyRef, inject, Injectable } from "@angular/core";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { SettingsService } from "@services/settings/settings.service";
import { catchError, map, Observable, of, Subscription, switchMap, take, takeUntil } from "rxjs";
import { environment } from "../../../environment/environment";
import { IWord } from "../../types/word.interface";
import { WordsStore } from "../../stores/words/words.store";
import { ELocalStorageKeys } from "@shared/constants/local-storage.constants";

@Injectable({
	providedIn: "root",
})
export class WordsResourceService {
	private http = inject(HttpClient);
	private settingsService = inject(SettingsService);
	private localStorageService = inject(LocalStorageService);
	private wordsStore = inject(WordsStore);
	private subscription = new Subscription();
	private destroyRef = inject(DestroyRef);

	private apiUrl = environment.apiUrl;
	private rssUrl = environment.rssUrl;

	constructor() {
		this.subscription = this.settingsService.isFetchWotdEnabled$.subscribe(() =>
			this.getWordsOfTheDay(),
		);

		this.load();

		this.destroyRef.onDestroy(() => {
			this.subscription.unsubscribe();
		});
	}

	saveData(wordList: IWord[]) {
		this.localStorageService.saveData(ELocalStorageKeys.WordList, wordList);
	}

	fetchDefinition$(word: string): Observable<string> {
		return this.settingsService.isFetchWordDefinitionEnabled$.pipe(
			take(1),
			switchMap((isEnabled) => {
				if (!isEnabled) {
					return of("");
				}

				return this.getResponseFromAPI(word).pipe(
					take(1),
					map(
						(response: any) =>
							response.entries?.[0]?.lexemes?.[0]?.senses?.[0]?.definition ?? "",
					),
				);
			}),
		);
	}

	private load() {
		const wordList = this.localStorageService.loadData(ELocalStorageKeys.WordList);
		if (wordList) {
			this.wordsStore.setWordList(wordList);
		}
	}

	private getResponseFromAPI(word: string) {
		return this.http.get(this.apiUrl + word);
	}

	private getWordsOfTheDay() {
		if (!this.settingsService.isFetchWotdEnabledValue) {
			this.wordsStore.setWordsOfTheDay([]);
			this.wordsStore.setWotdLoading(false);
			return;
		}

		const date = new Date();
		date.setUTCHours(0, 0, 0, 0);

		const lastFetchDate = this.localStorageService.loadData(ELocalStorageKeys.WotdFetchedDate);
		const currentDate = date.toISOString().split("T")[0];

		if (lastFetchDate === currentDate) {
			const words = this.localStorageService.loadData(ELocalStorageKeys.WotdWords) as IWord[];

			this.wordsStore.setWordsOfTheDay(words);
			this.wordsStore.setWotdLoading(false);
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

							if (!word || !definition) {
								return undefined;
							}

							return {
								id: i,
								name: word,
								definition,
								isLearning: false,
							};
						})
						.filter((word): word is IWord => word !== undefined);

					this.wordsStore.setWordsOfTheDay(words);
					this.wordsStore.setWotdLoading(false);
					this.localStorageService.saveData(ELocalStorageKeys.WotdWords, words);
					this.localStorageService.saveData(
						ELocalStorageKeys.WotdFetchedDate,
						date.toISOString().split("T")[0],
					);
				}),
				catchError((error: HttpErrorResponse) => {
					console.error(error);
					this.wordsStore.setWotdLoading(false);
					return of([]);
				}),
			)
			.subscribe();
	}
}
