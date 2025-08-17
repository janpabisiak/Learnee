import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { IWord } from "../types/word.interface";
import { BehaviorSubject, map, Observable, take } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
	providedIn: "root",
})
export class WordsService {
	private apiUrl = environment.apiUrl;
	private apiHost = environment.apiHost;
	private apiKey = environment.apiKey;
	private wordList = new BehaviorSubject<IWord[]>([]);
	wordList$ = this.wordList.asObservable();

	constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
		const wordList = this.localStorageService.loadData("word-list");
		if (wordList) this.wordList.next(wordList);
	}

	getResponseFromWordAPI(word: string) {
		return this.http.get(this.apiUrl + word, {
			headers: {
				"x-rapidapi-host": this.apiHost,
				"x-rapidapi-key": this.apiKey,
			},
		});
	}

	fetchWordDefinition(word: string): Observable<string> {
		return this.getResponseFromWordAPI(word).pipe(
			take(1),
			map(
				(response: any) =>
					response.entries?.[0]?.lexemes?.[0]?.senses?.[0]?.definition ?? ""
			)
		);
	}

	addWord(word: string, definition: string) {
		const wordList = this.wordList.value;
		if (wordList.some((w) => w.name === word)) return;

		const newWord: IWord = {
			id: wordList.length,
			name: word,
			definition,
			isLearning: true,
		};

		const updatedWordList = [...wordList, newWord];
		this.wordList.next(updatedWordList);
		this.saveData(updatedWordList);
	}

	getRandomWord(minIndex: number = 0, maxIndex: number = this.wordList.value.length) {
		const randomIndex = Math.floor(Math.random() * (maxIndex - minIndex) + minIndex);
		return this.wordList.value[randomIndex];
	}

	removeWord(wordId: number) {
		const newWordList = this.wordList.value.filter((w) => w.id !== wordId);

		this.wordList.next(newWordList);
		this.saveData(newWordList);
	}

	editWordDefinition(wordId: number, wordDefinition: string) {
		const newWordList = [...this.wordList.value].map((w) =>
			w.id === wordId ? { ...w, definition: wordDefinition } : w
		);

		this.wordList.next(newWordList);
		this.saveData(newWordList);
	}

	toggleIsLearning(wordId: number) {
		const newWordList = [...this.wordList.value].map((w) => {
			if (w.id !== wordId) return w;
			return {
				...w,
				isLearning: !w.isLearning,
			};
		});

		this.wordList.next(newWordList);
		this.saveData(newWordList);
	}

	private saveData(wordList: IWord[]) {
		this.localStorageService.saveData("word-list", wordList);
	}
}
