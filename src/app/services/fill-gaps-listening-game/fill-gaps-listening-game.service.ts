import { Injectable } from "@angular/core";
import { WordsService } from "@services/words/words.service";

@Injectable({
	providedIn: "root",
})
export class FillGapsListeningGameService {
	constructor(private wordsService: WordsService) {}

	generateFillGapsListeningGame() {
		const randomWord = this.wordsService.getRandomLearningWord();

		return {
			word: randomWord.name,
			definition: randomWord.definition,
		} as IFillGapsListeningGameData;
	}
}

export interface IFillGapsListeningGameData {
	word: string;
	definition: string;
}
