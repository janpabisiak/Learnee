import { Injectable } from "@angular/core";
import { WordsService } from "./words.service";
import { take } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class MatchingGameService {
	matches: { id: number; term: string; definition: string }[] = [];

	constructor(private wordsService: WordsService) {}

	generateMatchingGame(amount: number) {
		while (this.matches.length < amount) {
			const randomWord = this.wordsService.getRandomWord();

			if (this.matches.some((t) => t.id === randomWord.id)) continue;

			this.matches.push({
				id: randomWord.id,
				term: randomWord.name,
				definition: randomWord.definition,
			});
		}
	}

	get terms() {
		return this.matches.map((m) => m.term);
	}

	get definitions() {
		return this.matches.map((m) => m.definition);
	}

	checkAnswers(terms: string[], definitions: string[]) {
		const results: boolean[] = [];

		terms.forEach((term, i) => {
			results.push(
				this.matches.find((match) => match.term === term)?.definition === definitions[i]
					? true
					: false
			);
		});

		return results;
	}
}
