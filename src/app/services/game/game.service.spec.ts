import { provideHttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideTranslateService } from "@ngx-translate/core";
import { StatisticsService } from "@services/statistics/statistics.service";
import { createMockStatisticsService } from "@services/statistics/statistics.service.mock";
import { EAvailableGames } from "@shared/constants/game.constants";
import { GameStore } from "app/stores/game/game.store";
import { GameService } from "./game.service";

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

	it("should advance currentStageId synchronously on goToNextStage call", () => {
		const gameStore = TestBed.inject(GameStore);
		gameStore.setStages([
			{ id: 0, type: EAvailableGames.Quiz, answered: true, answeredCorrect: true, data: {} },
			{
				id: 1,
				type: EAvailableGames.Quiz,
				answered: false,
				answeredCorrect: false,
				data: {},
			},
		]);
		gameStore.setCurrentStageId(0);

		service.goToNextStage();

		expect(gameStore.currentStageIdValue).toBe(1);
	});

	it("should reset stages and currentStageId on cancelGame call", () => {
		const gameStore = TestBed.inject(GameStore);
		gameStore.setStages([
			{ id: 0, type: EAvailableGames.Quiz, answered: true, answeredCorrect: true, data: {} },
		]);
		gameStore.setCurrentStageId(1);

		service.cancelGame();

		expect(gameStore.stagesValue).toEqual([]);
		expect(gameStore.currentStageIdValue).toBe(0);
	});
});
