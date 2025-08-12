import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { WordsService } from "../../../services/words.service";
import { IAnswer } from "../../../types/answer.interface";
import { IQuestion } from "../../../types/question.interface";
import { QuestionListItemComponent } from "./question-list-item/question-list-item.component";

@Component({
	selector: "app-questions-list",
	imports: [QuestionListItemComponent],
	templateUrl: "./questions-list.component.html",
	standalone: true,
})
export class QuestionsListComponent {
	private wordListSubscription = new Subscription();
	questions: IQuestion[] = [];

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		// Generate quiz question
		const numOfQuestions = 5;
		for (let i = 0; i < numOfQuestions; i++) {
			const question: IQuestion = {
				id: i,
				content: "",
				possibleAnswers: [],
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

			this.questions.push(question);
		}
	}

	ngOnDestroy() {
		this.wordListSubscription.unsubscribe();
	}
}
