import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProgressBarComponent } from "@components/utils/progress-bar/progress-bar.component";
import { TranslatePipe } from "@ngx-translate/core";
import { LevelService } from "@services/level/level.service";
import { combineLatest, Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-level-progress",
	imports: [ProgressBarComponent, TranslatePipe],
	templateUrl: "./level-progress.component.html",
})
export class LevelProgressComponent implements OnInit, OnDestroy {
	level = 0;
	xpPoints = 0;
	xpForNextLevel = 0;
	levelProgress = 0;
	private destroy$ = new Subject<void>();

	constructor(private levelService: LevelService) {}

	ngOnInit() {
		combineLatest([this.levelService.xpPoints$, this.levelService.level$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([xpPoints, level]) => {
				this.xpPoints = xpPoints;
				this.level = level;

				this.xpForNextLevel = this.levelService.calcNeededXp(level + 1);
				this.levelProgress = Math.round((xpPoints / this.xpForNextLevel) * 100);
			});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
