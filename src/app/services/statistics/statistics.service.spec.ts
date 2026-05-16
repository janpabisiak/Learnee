import { TestBed } from "@angular/core/testing";
import { StatisticsService } from "./statistics.service";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { createMockLocalStorageService } from "@services/local-storage/local-storage.service.mock";

describe("StatisticsService", () => {
	let service: StatisticsService;
	let localStorageServiceMock: any;

	beforeEach(() => {
		localStorageServiceMock = createMockLocalStorageService();
		TestBed.configureTestingModule({
			providers: [
				StatisticsService,
				{ provide: LocalStorageService, useValue: localStorageServiceMock },
			],
		});
		service = TestBed.inject(StatisticsService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
