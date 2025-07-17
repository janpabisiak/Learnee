import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { IWord } from "../types/word.interface";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
	providedIn: "root",
})
export class WordsService {
	private apiUrl = environment.apiUrl;
	private apiHost = environment.apiHost;
	private apiKey = environment.apiKey;
	wordList$ = new BehaviorSubject<IWord[]>([]);

	constructor(
		private http: HttpClient,
		private localStorageService: LocalStorageService
	) {
		const wordList = this.localStorageService.loadData("word-list");
		if (wordList) this.wordList$.next(wordList);
	}

	getResponseFromWordAPI(word: string) {
		return this.http.get(this.apiUrl + word, {
			headers: {
				"x-rapidapi-host": this.apiHost,
				"x-rapidapi-key": this.apiKey,
			},
		});
	}

	addWord(word: string) {
		const wordList = this.wordList$.value;
		if (wordList.every((w) => w.name !== word)) {
			this.getResponseFromWordAPI(word).subscribe((response: any) => {
				const wordDefinition =
					response.entries?.[0]?.lexemes?.[0]?.senses?.[0]
						?.definition;

				const newWord: IWord = {
					id: wordList.length,
					name: word,
					definition: wordDefinition,
					isLearning: true,
				};

				const newWordList = [...wordList, newWord];
				this.wordList$.next(newWordList);
				this.saveData(newWordList);
			});
		}
	}

	removeWord(wordId: number) {
		const newWordList = this.wordList$.value.filter((w) => w.id !== wordId);

		this.wordList$.next(newWordList);
		this.saveData(newWordList);
	}

	editWordDefinition(wordId: number, wordDefinition: string) {
		const newWordList = [...this.wordList$.value].map((w) =>
			w.id === wordId ? { ...w, definition: wordDefinition } : w
		);

		this.wordList$.next(newWordList);
		this.saveData(newWordList);
	}

	toggleIsLearning(wordId: number) {
		const newWordList = [...this.wordList$.value].map((w) => {
			if (w.id !== wordId) return w;
			return {
				...w,
				isLearning: !w.isLearning,
			};
		});

		this.wordList$.next(newWordList);
		this.saveData(newWordList);
	}

	saveData(wordList: IWord[]) {
		this.localStorageService.saveData("word-list", wordList);
	}
}
