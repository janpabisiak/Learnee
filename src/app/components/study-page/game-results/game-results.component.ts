import { Component, OnDestroy, OnInit } from "@angular/core";
import { SectionTitleComponent } from "@components/utils/section-title/section-title.component";
import { EAvailableGames, GameService, IStage } from "@services/game.service";
import { Subject, takeUntil } from "rxjs";
import { GameContainerComponent } from "../game-section/game-container/game-container.component";

@Component({
	selector: "app-game-results",
	imports: [SectionTitleComponent, GameContainerComponent],
	templateUrl: "./game-results.component.html",
})
export class GameResultsComponent implements OnInit, OnDestroy {
	stages: IStage[] = [];
	EAvailableGames = EAvailableGames;
	private destroy$ = new Subject<void>();

	constructor(private gameService: GameService) {}

	ngOnInit() {
		this.gameService.stages$.pipe(takeUntil(this.destroy$)).subscribe((stages) => {
			this.stages = stages;
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
