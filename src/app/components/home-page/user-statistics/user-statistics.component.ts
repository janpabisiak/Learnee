import { Component, OnDestroy, OnInit } from "@angular/core";
import { HeatMapItemComponent } from "./heat-map-item/heat-map-item.component";
import { IStatistics, LevelService } from "@services/level.service";
import { Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-user-statistics",
	imports: [HeatMapItemComponent],
	templateUrl: "./user-statistics.component.html",
})
export class UserStatisticsComponent implements OnInit, OnDestroy {
	statistics: IStatistics[] = [];
	maxPlays = 0;
	private destroy$ = new Subject<void>();

	constructor(private levelService: LevelService) {}

	ngOnInit() {
		this.levelService.statistics$.pipe(takeUntil(this.destroy$)).subscribe((statistics) => {
			this.statistics = Array.from(statistics).map(([date, numberOfPlays]) => ({
				date,
				numberOfPlays,
			}));

			this.maxPlays = Math.max(...this.statistics.map((day) => day.numberOfPlays));
		});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
