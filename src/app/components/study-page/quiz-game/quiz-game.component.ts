import { NgClass } from "@angular/common";
import { Component, HostListener, Input, OnDestroy, OnInit } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { GameService } from "@services/game/game.service";
import { ButtonComponent } from "@shared/components/button/button.component";
import { combineLatest, Subject, takeUntil } from "rxjs";
import { IQuestion } from "../../../types/question.interface";
import { IStage } from "../../../types/stage.interface";
import { QuestionAnswerComponent } from "./question-answer/question-answer.component";

@Component({
	selector: "app-quiz-game",
	imports: [QuestionAnswerComponent, NgClass, ButtonComponent, TranslatePipe],
	templateUrl: "./quiz-game.component.html",
})
export class QuizGameComponent implements OnInit, OnDestroy {
	@Input() stage: IStage | null = null;
	private destroy$ = new Subject<void>();
	currentStageId = 0;
	question: IQuestion | null = null;
	isVisible = false;
	isLastStage = false;

	@HostListener("window:keydown", ["$event"]) handleKeydown(e: KeyboardEvent) {
		if (this.stage || e.key !== "Enter") return;

		if (this.question?.answered) {
			this.nextStage();
		} else {
			this.skipQuestion();
		}
	}

	constructor(private gameService: GameService) {}

	ngOnInit() {
		if (this.stage) {
			this.currentStageId = this.stage.id;
			this.question = this.stage.data;

			return;
		}

		combineLatest([this.gameService.stages$, this.gameService.currentStageId$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([stages, currentId]) => {
				if (!stages || !stages[currentId]) return;

				this.currentStageId = currentId;
				this.question = stages[currentId].data;
				this.isLastStage = currentId === stages.length - 1;

				this.isVisible = true;
			});
	}

	changeVisibility() {
		this.isVisible = false;
	}

	skipQuestion() {
		if (this.question?.answered) return;

		this.gameService.submitAnswer(-1);
		this.changeVisibility();
	}

	nextStage() {
		this.isVisible = false;
		this.gameService.goToNextStage();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
