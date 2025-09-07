import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from "@angular/core";
import { EAvailableGames, GameService, IStage } from "@services/game.service";
import { combineLatest, Subject, takeUntil } from "rxjs";
import { MatchingGameComponent } from "./matching-game/matching-game.component";
import { QuizGameComponent } from "./quiz-game/quiz-game.component";
import { StudyProgressBarComponent } from "./study-progress-bar/study-progress-bar.component";
import { ButtonComponent } from "@components/utils/button/button.component";
import { GameSelectorComponent } from "./game-selector/game-selector.component";

@Component({
	selector: "app-study-page",
	imports: [
		QuizGameComponent,
		MatchingGameComponent,
		StudyProgressBarComponent,
		ButtonComponent,
		GameSelectorComponent,
	],
	templateUrl: "./study-page.component.html",
	providers: [GameService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudyPageComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();
	stages: IStage[] = [];
	currentStageId = 0;
	EAvailableGames = EAvailableGames;
	hasSelectedGames = false;

	constructor(private gameService: GameService) {}

	ngOnInit() {
		combineLatest([
			this.gameService.selectedGames$,
			this.gameService.stages$,
			this.gameService.currentStageId$,
		])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([selectedGames, stages, currentId]) => {
				this.hasSelectedGames = !selectedGames.length;
				this.stages = stages;
				this.currentStageId = currentId;
			});
	}

	getCurrentStage() {
		return this.stages[this.currentStageId];
	}

	startGame() {
		this.gameService.generateStages();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
