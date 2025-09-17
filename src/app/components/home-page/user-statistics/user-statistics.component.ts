import { Component } from "@angular/core";
import { HeatMapComponent } from "./heat-map/heat-map.component";
import { LevelProgressComponent } from "./level-progress/level-progress.component";

@Component({
	selector: "app-user-statistics",
	templateUrl: "./user-statistics.component.html",
	imports: [HeatMapComponent, LevelProgressComponent],
})
export class UserStatisticsComponent {}
