import { Injectable } from "@angular/core";
import { WordsService } from "./words.service";

@Injectable({
	providedIn: "root",
})
export class MatchingGameService {
	constructor(private wordsService: WordsService) {}

	generateMatchingGame(amount: number = 5) {
		const matches: IMatch[] = [];

		while (matches.length < amount) {
			const randomWord = this.wordsService.getRandomLearningWord();
			if (!randomWord) return;

			if (matches.some((t) => t.id === randomWord.id)) continue;

			matches.push({
				id: randomWord.id,
				term: randomWord.name,
				definition: randomWord.definition,
			});
		}

		return matches;
	}

	checkAnswers(matches: IMatch[], terms: string[], definitions: string[]): boolean[] {
		return terms.map((term, index) => {
			const match = matches.find((m) => m.term === term);
			const selectedDefinition = definitions[index];

			return match?.definition === selectedDefinition;
		});
	}
}

export interface IMatch {
	id: number;
	term: string;
	definition: string;
}
