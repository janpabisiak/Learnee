import { DatePipe, NgClass } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { IStatistics } from "@services/level.service";

@Component({
	selector: "app-heat-map-item",
	imports: [NgClass, DatePipe],
	templateUrl: "./heat-map-item.component.html",
})
export class HeatMapItemComponent implements OnInit {
	@Input({ required: true }) day!: IStatistics;
	@Input({ required: true }) maxPlays!: number;
	percentOfMax = 0;

	ngOnInit() {
		this.percentOfMax = isNaN(this.day.numberOfPlays / this.maxPlays)
			? 0
			: this.day.numberOfPlays / this.maxPlays;
	}
}
