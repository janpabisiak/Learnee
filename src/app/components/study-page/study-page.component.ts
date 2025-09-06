import { Component, OnDestroy, OnInit } from "@angular/core";
import { EAvailableGames, GameService, IStage } from "@services/game.service";
import { combineLatest, Subject, takeUntil } from "rxjs";
import { MatchingGameComponent } from "./matching-game/matching-game.component";
import { QuizGameComponent } from "./quiz-game/quiz-game.component";
import { StudyProgressBarComponent } from "./study-progress-bar/study-progress-bar.component";

@Component({
	selector: "app-study-page",
	imports: [QuizGameComponent, MatchingGameComponent, StudyProgressBarComponent],
	templateUrl: "./study-page.component.html",
	providers: [GameService],
})
export class StudyPageComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();
	stages: IStage[] = [];
	currentStageId: number = 0;
	EAvailableGames = EAvailableGames;

	constructor(private gameService: GameService) {}

	ngOnInit() {
		this.gameService.generateStages();

		combineLatest([this.gameService.stages$, this.gameService.currentStageId$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([stages, currentId]) => {
				this.stages = stages;
				this.currentStageId = currentId;
			});
	}

	getCurrentStage() {
		return this.stages[this.currentStageId];
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
