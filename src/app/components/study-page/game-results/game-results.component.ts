import { Component, OnDestroy, OnInit } from "@angular/core";
import { SectionTitleComponent } from "@components/utils/section-title/section-title.component";
import { EAvailableGames, GameService, IStage } from "@services/game/game.service";
import { Subject, take, takeUntil } from "rxjs";
import { GameContainerComponent } from "../game-section/game-container/game-container.component";
import { ProgressBarComponent } from "@components/utils/progress-bar/progress-bar.component";
import { TranslateService } from "@ngx-translate/core";
import { NgIf } from "@angular/common";

@Component({
	selector: "app-game-results",
	imports: [SectionTitleComponent, GameContainerComponent, ProgressBarComponent, NgIf],
	templateUrl: "./game-results.component.html",
})
export class GameResultsComponent implements OnInit, OnDestroy {
	stages: IStage[] = [];
	correctAnswerAmount = 0;
	correctAnswerPercentage = 0;
	EAvailableGames = EAvailableGames;
	translations: Record<string, string> | null = null;
	private destroy$ = new Subject<void>();

	constructor(private gameService: GameService, private translation: TranslateService) {}

	ngOnInit() {
		this.gameService.stages$.pipe(takeUntil(this.destroy$)).subscribe((stages) => {
			this.stages = stages;
			this.correctAnswerAmount = stages.reduce(
				(acc, stage) => acc + +(stage.answeredCorrect === true),
				0
			);
			this.correctAnswerPercentage = stages.length
				? Math.round((this.correctAnswerAmount / stages.length) * 100)
				: 0;
		});

		this.translation
			.get(["study.finished.title", "study.finished.button"])
			.pipe(take(1))
			.subscribe((translations) => {
				this.translations = translations;
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
