import { Component, OnDestroy, OnInit } from "@angular/core";
import { IQuestion } from "../../../types/question.interface";
import { QuestionAnswerComponent } from "./question-answer/question-answer.component";
import { combineLatest, Subject, takeUntil } from "rxjs";
import { GameService } from "@services/game.service";
import { NgClass } from "@angular/common";

@Component({
	selector: "app-quiz-game",
	imports: [QuestionAnswerComponent, NgClass],
	templateUrl: "./quiz-game.component.html",
})
export class QuizGameComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();
	currentStageId: number = 0;
	question: IQuestion | null = null;
	isVisible = false;

	constructor(private gameService: GameService) {}

	ngOnInit() {
		combineLatest([this.gameService.stages$, this.gameService.currentStageId$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([stages, currentId]) => {
				this.currentStageId = currentId;
				this.question = stages[currentId].data;

				this.isVisible = true;
			});
	}

	changeVisibility() {
		this.isVisible = false;
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
