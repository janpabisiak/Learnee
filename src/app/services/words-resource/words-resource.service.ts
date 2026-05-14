import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { SettingsService } from "@services/settings/settings.service";
import { catchError, map, Observable, of, switchMap, take } from "rxjs";
import { environment } from "../../../environment/environment";
import { IWord } from "../../types/word.interface";
import { WordsStore } from "../../stores/words.store";

@Injectable({
	providedIn: "root",
})
export class WordsResourceService {
	private http = inject(HttpClient);
	private settingsService = inject(SettingsService);
	private localStorageService = inject(LocalStorageService);
	private wordsStore = inject(WordsStore);

	private apiUrl = environment.apiUrl;
	private rssUrl = environment.rssUrl;

	constructor() {
		this.getWordsOfTheDay();
		this.load();
	}

	saveData(wordList: IWord[]) {
		this.localStorageService.saveData("word-list", wordList);
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
		const wordList = this.localStorageService.loadData("word-list");
		if (wordList) {
			this.wordsStore.setWordList(wordList);
		}
	}

	private getResponseFromAPI(word: string) {
		return this.http.get(this.apiUrl + word);
	}

	private getWordsOfTheDay() {
		const date = new Date();
		date.setUTCHours(0, 0, 0, 0);

		if (
			this.localStorageService.loadData("wotd-fetched-date") ===
			date.toISOString().split("T")[0]
		) {
			const words = this.localStorageService.loadData("wotd-words") as IWord[];

			this.wordsStore.setWordsOfTheDay(words);
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
