import { NgClass } from "@angular/common";
import { Component, HostListener, Input, OnDestroy, OnInit } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { GameService } from "@services/game/game.service";
import { ButtonComponent } from "@shared/components/button/button.component";
import { combineLatest, Subject, takeUntil } from "rxjs";
import { IStage } from "../../../types/stage.interface";
import { TrueFalseAnswerComponent } from "./true-false-answer/true-false-answer.component";

@Component({
	selector: "app-true-false-game",
	imports: [NgClass, TrueFalseAnswerComponent, ButtonComponent, TranslatePipe],
	templateUrl: "./true-false-game.component.html",
})
export class TrueFalseGameComponent implements OnInit, OnDestroy {
	@Input() stage: IStage | null = null;
	currentStageId = 0;
	data: IStage | null = null;
	isVisible = false;
	showAnswer = false;
	isLastStage = false;
	private destroy$ = new Subject<void>();

	@HostListener("window:keydown", ["$event"]) handleKeydown(e: KeyboardEvent) {
		if (this.stage || e.key !== "Enter") return;

		if (this.data?.answered) {
			this.nextStage();
		} else {
			this.skipQuestion();
		}
	}

	constructor(private gameService: GameService) {}

	ngOnInit() {
		if (this.stage) {
			this.currentStageId = this.stage.id;
			this.data = this.stage;
			this.showAnswer = true;

			return;
		}

		combineLatest([this.gameService.stages$, this.gameService.currentStageId$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([stages, currentStageId]) => {
				if (!stages || !stages[currentStageId]) return;

				this.currentStageId = currentStageId;
				this.data = stages[currentStageId];
				this.showAnswer = this.data.answered;
				this.isLastStage = currentStageId === stages.length - 1;

				this.isVisible = true;
			});
	}

	answerQuestion(isTrue: boolean) {
		if (this.data?.answered) return;

		this.gameService.submitAnswer(isTrue);
		this.showAnswer = true;
		this.isVisible = false;
	}

	skipQuestion() {
		if (this.data?.answered) return;

		this.gameService.submitAnswer(null);
		this.showAnswer = true;
		this.isVisible = false;
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
