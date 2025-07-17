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

				this.wordList$.next([...wordList, newWord]);
			});
		}
	}

	removeWord(wordId: number) {
		this.wordList$.next(
			this.wordList$.value.filter((w) => w.id !== wordId)
		);
	}

	editWordDefinition(wordId: number, wordDefinition: string) {
		const wordList = [...this.wordList$.value].map((w) => {
			if (w.id !== wordId) return w;
			return {
				...w,
				definition: wordDefinition,
			};
		});

		this.wordList$.next(wordList);
	}

	toggleIsLearning(wordId: number) {
		const wordList = [...this.wordList$.value].map((w) => {
			if (w.id !== wordId) return w;
			return {
				...w,
				isLearning: !w.isLearning,
			};
		});

		this.wordList$.next(wordList);
	}

	saveWordList() {
		this.localStorageService.saveData("word-list", this.wordList$.value);
	}
}
