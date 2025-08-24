import { Component, OnDestroy, OnInit } from "@angular/core";
import { IQuestion } from "../../../types/question.interface";
import { QuestionAnswerComponent } from "./question-answer/question-answer.component";
import { QuizService } from "@services/quiz.service";
import { combineLatest, Subscription } from "rxjs";

@Component({
	selector: "app-quiz-question",
	imports: [QuestionAnswerComponent],
	templateUrl: "./quiz-question.component.html",
})
export class QuizQuestionComponent implements OnInit, OnDestroy {
	private subscriptions = new Subscription();
	question: IQuestion | null = null;

	constructor(private quizService: QuizService) {}

	ngOnInit() {
		this.subscriptions.add(
			combineLatest([
				this.quizService.questions$,
				this.quizService.currentQuestionId$,
			]).subscribe(([questions, currentId]) => {
				this.question = questions[currentId];
			})
		);
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}
}
