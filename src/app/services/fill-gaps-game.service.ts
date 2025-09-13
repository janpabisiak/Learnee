import { Injectable } from "@angular/core";
import { WordsService } from "./words.service";

@Injectable({
	providedIn: "root",
})
export class FillGapsGameService {
	constructor(private wordsService: WordsService) {}

	generateFillGapsGame() {
		const randomWord = this.wordsService.getRandomLearningWord();

		return {
			word: randomWord.name,
			definition: randomWord.definition,
		} as IFillGapsGameData;
	}
}

export interface IFillGapsGameData {
	word: string;
	definition: string;
}
