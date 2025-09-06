import { Component, Input } from "@angular/core";
import { IAnswer } from "../../../../../types/answer.interface";
import { QuizService } from "@services/quiz.service";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-question-answer",
	imports: [CommonModule],
	templateUrl: "./question-answer.component.html",
})
export class QuestionAnswerComponent {
	@Input({ required: true }) answer!: IAnswer;
	@Input() showAnswer = false;

	constructor(private quizService: QuizService) {}

	answerQuestion(answerId: number) {
		this.quizService.answerQuestion(answerId);
	}
}
