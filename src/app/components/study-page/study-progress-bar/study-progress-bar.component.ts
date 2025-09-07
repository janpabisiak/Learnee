import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GameService, IStage } from "@services/game.service";
import { combineLatest, Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-study-progress-bar",
	imports: [CommonModule],
	templateUrl: "./study-progress-bar.component.html",
})
export class StudyProgressBarComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();
	stages: IStage[] = [];
	currentId = 0;

	constructor(private gameService: GameService) {}

	ngOnInit() {
		combineLatest([this.gameService.stages$, this.gameService.currentStageId$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([stages, currentId]) => {
				this.stages = stages;
				this.currentId = currentId;
			});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
