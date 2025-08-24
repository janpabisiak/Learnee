import { Injectable } from "@angular/core";
import { WordsService } from "./words.service";
import { IAnswer } from "../types/answer.interface";
import { IQuestion } from "../types/question.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class QuizService {
	private questions = new BehaviorSubject<IQuestion[]>([]);
	private currentQuestionId = new BehaviorSubject<number>(0);
	questions$ = this.questions.asObservable();
	currentQuestionId$ = this.currentQuestionId.asObservable();

	constructor(private wordsService: WordsService) {}

	generateQuestions(amount: number) {
		const questions: IQuestion[] = [];

		for (let i = 0; i < amount; i++) {
			const question: IQuestion = {
				id: i,
				content: "",
				possibleAnswers: [],
				answered: false,
				answeredCorrect: false,
			};
			const randomWord = this.wordsService.getRandomWord();
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
				const randomWord = this.wordsService.getRandomWord();
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

			questions.push(question);
		}

		this.questions.next(questions);
	}

	answerQuestion(answerId: number) {
		const questions = this.questions.value;
		const currentQuestionId = this.currentQuestionId.value;
		const correctAnswerId = questions[currentQuestionId].possibleAnswers.find(
			(a) => a.isCorrect === true
		)?.id;

		this.questions.next(
			questions.map((q) =>
				q.id !== currentQuestionId
					? q
					: {
							...q,
							answered: true,
							answeredCorrect: correctAnswerId === answerId,
					  }
			)
		);

		setTimeout(() => {
			if (currentQuestionId < questions.length - 1) {
				this.currentQuestionId.next(currentQuestionId + 1);
			}
		}, 1000);
	}

	destroy() {
		this.questions.next([]);
		this.currentQuestionId.next(0);
	}
}
