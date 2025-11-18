import { Component, OnDestroy, OnInit } from "@angular/core";
import { IStatistics, LevelService } from "@services/level/level.service";
import { Subject, takeUntil } from "rxjs";
import { HeatMapItemComponent } from "./heat-map-item/heat-map-item.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
	selector: "app-heat-map",
	imports: [HeatMapItemComponent, TranslatePipe],
	templateUrl: "./heat-map.component.html",
})
export class HeatMapComponent implements OnInit, OnDestroy {
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
