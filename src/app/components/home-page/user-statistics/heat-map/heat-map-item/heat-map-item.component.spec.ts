import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeatMapItemComponent } from "./heat-map-item.component";
import { provideHttpClient } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { mockStatistics } from "@services/statistics/statistics.service.mock";
import { provideTranslateService } from "@ngx-translate/core";

describe("HeatMapItemComponent", () => {
	let component: HeatMapItemComponent;
	let fixture: ComponentFixture<HeatMapItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HeatMapItemComponent, DatePipe],
			providers: [
				provideHttpClient(),
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HeatMapItemComponent);
		component = fixture.componentInstance;
		component.day = {
			date: mockStatistics[0].date,
			numberOfPlays: mockStatistics[0].numberOfPlays,
		};
		component.maxPlays = 10;

		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should set percentOfMax field correctly", () => {
		expect(component.percentOfMax).toBe(0.4);
	});
});
