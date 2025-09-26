import { Component, OnDestroy, OnInit } from "@angular/core";
import { GameContainerComponent } from "./game-container/game-container.component";
import { ButtonComponent } from "@components/utils/button/button.component";
import { StudyProgressBarComponent } from "../study-progress-bar/study-progress-bar.component";
import { GameService, IStage } from "@services/game.service";
import { combineLatest, Subject, takeUntil } from "rxjs";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
	selector: "app-game-section",
	imports: [GameContainerComponent, ButtonComponent, StudyProgressBarComponent, TranslatePipe],
	templateUrl: "./game-section.component.html",
})
export class GameSectionComponent implements OnInit, OnDestroy {
	currentStage: IStage | null = null;
	private destroy$ = new Subject<void>();

	constructor(private gameService: GameService) {}

	ngOnInit() {
		combineLatest([this.gameService.stages$, this.gameService.currentStageId$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([stages, currentStageId]) => {
				this.currentStage = stages[currentStageId];
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
