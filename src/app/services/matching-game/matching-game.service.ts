import { Injectable } from "@angular/core";
import { WordsService } from "@services/words/words.service";
import { IGameStrategy } from "../../types/game-strategy.interface";

interface IMatchingAnswer {
	terms: string[];
	definitions: string[];
}

@Injectable({
	providedIn: "root",
})
export class MatchingGameService implements IGameStrategy<any, IMatchingAnswer, boolean[]> {
	constructor(private wordsService: WordsService) {}

	generateGameData(pairs = 5): IMatch[] {
		const matches: IMatch[] = [];

		while (matches.length < pairs) {
			const randomWord = this.wordsService.getRandomLearningWord();

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

	validateAnswer(gameData: any, answer: IMatchingAnswer) {
		const results = this.checkAnswers(gameData, answer.terms, answer.definitions);
		const isCorrect = results.every((r) => r);

		return {
			isCorrect,
			returnVal: results,
		};
	}
}

export interface IMatch {
	id: number;
	term: string;
	definition: string;
}
