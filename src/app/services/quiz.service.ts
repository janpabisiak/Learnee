import { Injectable } from "@angular/core";
import { WordsService } from "./words.service";
import { IAnswer } from "../types/answer.interface";
import { IQuestion } from "../types/question.interface";

@Injectable({
	providedIn: "root",
})
export class QuizService {
	constructor(private wordsService: WordsService) {}

	generateQuestion(): IQuestion {
		const question: IQuestion = {
			content: "",
			possibleAnswers: [],
			answered: false,
			answeredCorrect: false,
		};
		const randomWord = this.wordsService.getRandomLearningWord();

		question.content = randomWord.name;
		const answer: IAnswer = {
			id: 0,
			content: randomWord.definition,
			isCorrect: true,
		};
		question.possibleAnswers.push(answer);

		// Store added answers to avoid duplicates
		const addedAnswers = [answer.content];

		let possibleAnswersLength = addedAnswers.length;
		while (possibleAnswersLength < 4) {
			const randomWord = this.wordsService.getRandomLearningWord();

			// Try again if word is already in added answers array
			if (addedAnswers.includes(randomWord.definition)) continue;

			const wrongAnswer: IAnswer = {
				id: possibleAnswersLength,
				content: randomWord.definition,
				isCorrect: false,
			};

			addedAnswers.push(wrongAnswer.content);
			question.possibleAnswers.push(wrongAnswer);
			possibleAnswersLength++;
		}

		// Shuffle possible answers
		question.possibleAnswers.sort(() => Math.random() - 0.5);

		return question;
	}

	answerQuestion(question: IQuestion, answerId: number): IQuestion {
		return {
			...question,
			answered: true,
			answeredCorrect:
				question.possibleAnswers.find((a) => a.id === answerId)?.isCorrect || false,
		};
	}
}
