import { Component, OnDestroy, OnInit } from "@angular/core";
import { IQuestion } from "../../../types/question.interface";
import { Subscription } from "rxjs";
import { QuizProgressBarComponent } from "./quiz-progress-bar/quiz-progress-bar.component";
import { QuizQuestionComponent } from "./quiz-question/quiz-question.component";
import { QuizService } from "@services/quiz.service";

@Component({
	selector: "app-quiz-game",
	imports: [QuizProgressBarComponent, QuizQuestionComponent],
	templateUrl: "./quiz-game.component.html",
	standalone: true,
})
export class QuizGameComponent implements OnInit, OnDestroy {
	private subscriptions = new Subscription();
	questions: IQuestion[] = [];

	constructor(private quizService: QuizService) {}

	ngOnInit() {
		this.quizService.generateQuestions(10);

		this.subscriptions.add(
			this.quizService.questions$.subscribe((questions) => {
				this.questions = questions;
			})
		);
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
		this.quizService.destroy();
	}
}
