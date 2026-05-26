import { Injectable } from "@angular/core";
import { WordsService } from "@services/words/words.service";
import { IGameStrategy } from "../../types/game-strategy.interface";

@Injectable({
	providedIn: "root",
})
export class FillGapsListeningGameService implements IGameStrategy<any, string, void> {
	constructor(private wordsService: WordsService) {}

	generateGameData(): IFillGapsListeningGameData {
		const randomWord = this.wordsService.getRandomLearningWord();

		return {
			word: randomWord.name,
			definition: randomWord.definition,
		};
	}

	validateAnswer(gameData: any, answer: string) {
		const isCorrect = gameData.word.trim().toLowerCase() === answer.toLowerCase();

		return { isCorrect };
	}
}

export interface IFillGapsListeningGameData {
	word: string;
	definition: string;
}
