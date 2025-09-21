import { Component, OnDestroy, OnInit } from "@angular/core";
import { SectionTitleComponent } from "@components/utils/section-title/section-title.component";
import { EAvailableGames, GameService, IStage } from "@services/game.service";
import { Subject, takeUntil } from "rxjs";
import { GameContainerComponent } from "../game-section/game-container/game-container.component";
import { ProgressBarComponent } from "@components/utils/progress-bar/progress-bar.component";

@Component({
	selector: "app-game-results",
	imports: [SectionTitleComponent, GameContainerComponent, ProgressBarComponent],
	templateUrl: "./game-results.component.html",
})
export class GameResultsComponent implements OnInit, OnDestroy {
	stages: IStage[] = [];
	correctAnswerAmount = 0;
	correctAnswerPercentage = 0;
	EAvailableGames = EAvailableGames;
	private destroy$ = new Subject<void>();

	constructor(private gameService: GameService) {}

	ngOnInit() {
		this.gameService.stages$.pipe(takeUntil(this.destroy$)).subscribe((stages) => {
			this.stages = stages;
			this.correctAnswerAmount = stages.reduce(
				(acc, stage) => acc + +(stage.answeredCorrect === true),
				0
			);
			this.correctAnswerPercentage =
				Math.round(this.correctAnswerAmount / stages.length) * 100;
		});
	}

	cancelGame() {
		this.gameService.cancelGame();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
