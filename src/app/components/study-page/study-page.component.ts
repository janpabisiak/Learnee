import { Component, OnDestroy, OnInit } from "@angular/core";
import { EAvailableGames, GameService, IStage } from "@services/game.service";
import { combineLatest, Subject, takeUntil } from "rxjs";
import { GameSelectorComponent } from "./game-selector/game-selector.component";
import { GameResultsComponent } from "./game-results/game-results.component";
import { NgIf } from "@angular/common";
import { GameSectionComponent } from "./game-section/game-section.component";

@Component({
	selector: "app-study-page",
	imports: [GameSelectorComponent, GameResultsComponent, NgIf, GameSectionComponent],
	templateUrl: "./study-page.component.html",
	providers: [],
})
export class StudyPageComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();
	stages: IStage[] = [];
	currentStageId = 0;
	EAvailableGames = EAvailableGames;

	constructor(private gameService: GameService) {}

	ngOnInit() {
		combineLatest([this.gameService.stages$, this.gameService.currentStageId$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([stages, currentId]) => {
				this.stages = stages;
				this.currentStageId = currentId;
			});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
