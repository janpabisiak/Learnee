import { TestBed } from "@angular/core/testing";
import { GameService } from "./game.service";
import { StatisticsService } from "@services/statistics/statistics.service";
import { createMockStatisticsService } from "@services/statistics/statistics.service.mock";
import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";

describe("GameService", () => {
	let service: GameService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				GameService,
				{ provide: StatisticsService, useValue: createMockStatisticsService() },
				provideHttpClient(),
				provideTranslateService(),
			],
		});
		service = TestBed.inject(GameService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
