import { Injectable } from "@angular/core";
import { WordsService } from "@services/words/words.service";
import { IGameStrategy } from "../../types/game-strategy.interface";

@Injectable({
	providedIn: "root",
})
export class TrueFalseGameService implements IGameStrategy<any, boolean | null, void> {
	constructor(private wordsService: WordsService) {}

	generateGameData(): ITrueFalseGameData {
		const selectedWord = this.wordsService.getRandomLearningWord();
		const shouldGetDifferentDef = Math.random() > 0.5;

		if (!shouldGetDifferentDef) {
			return {
				word: selectedWord.name,
				definition: selectedWord.definition,
				isCorrect: true,
			};
		}

		let anotherWord = this.wordsService.getRandomLearningWord();
		while (selectedWord === anotherWord) {
			anotherWord = this.wordsService.getRandomLearningWord();
		}

		return {
			word: selectedWord.name,
			definition: anotherWord.definition,
			isCorrect: false,
		};
	}

	validateAnswer(gameData: any, isTrue: boolean | null) {
		const isCorrect = isTrue !== null && gameData.isCorrect === isTrue;

		return { isCorrect };
	}
}

export interface ITrueFalseGameData {
	word: string;
	definition: string;
	isCorrect: boolean;
}
