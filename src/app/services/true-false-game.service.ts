import { Injectable } from "@angular/core";
import { WordsService } from "./words.service";

@Injectable({
	providedIn: "root",
})
export class TrueFalseGameService {
	constructor(private wordsService: WordsService) {}

	generateTrueFalseGame() {
		const selectedWord = this.wordsService.getRandomLearningWord();
		const shouldGetDifferentDef = Math.random() > 0.5;

		if (!shouldGetDifferentDef) {
			return {
				word: selectedWord.name,
				definition: selectedWord.definition,
				isCorrect: true,
			} as ITrueFalseGameData;
		}

		let anotherWord = this.wordsService.getRandomLearningWord();
		while (selectedWord === anotherWord) {
			anotherWord = this.wordsService.getRandomLearningWord();
		}

		return {
			word: selectedWord.name,
			definition: anotherWord.definition,
			isCorrect: false,
		} as ITrueFalseGameData;
	}
}

export interface ITrueFalseGameData {
	word: string;
	definition: string;
	isCorrect: boolean;
}
