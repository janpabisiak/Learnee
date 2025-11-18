import { NgClass } from "@angular/common";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { GameService, IStage } from "@services/game/game.service";
import { combineLatest, Subject, takeUntil } from "rxjs";
import { TrueFalseAnswerComponent } from "./true-false-answer/true-false-answer.component";

@Component({
	selector: "app-true-false-game",
	imports: [NgClass, TrueFalseAnswerComponent],
	templateUrl: "./true-false-game.component.html",
})
export class TrueFalseGameComponent implements OnInit, OnDestroy {
	@Input() stage: IStage | null = null;
	currentStageId = 0;
	data: IStage | null = null;
	isVisible = false;
	showAnswer = false;
	private destroy$ = new Subject<void>();

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

				this.isVisible = true;
			});
	}

	answerQuestion(isTrue: boolean) {
		this.gameService.answerTrueFalseGameQuestion(isTrue);
		this.showAnswer = true;

		this.gameService.goToNextStage();
		this.isVisible = false;
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
