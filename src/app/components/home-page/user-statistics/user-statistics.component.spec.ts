import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserStatisticsComponent } from "./user-statistics.component";
import { LevelProgressComponent } from "./level-progress/level-progress.component";
import { HeatMapComponent } from "./heat-map/heat-map.component";

describe("UserStatisticsComponent", () => {
	let component: UserStatisticsComponent;
	let fixture: ComponentFixture<UserStatisticsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UserStatisticsComponent, LevelProgressComponent, HeatMapComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(UserStatisticsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
