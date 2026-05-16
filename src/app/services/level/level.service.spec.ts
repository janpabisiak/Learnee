import { TestBed } from "@angular/core/testing";
import { LevelService } from "./level.service";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { createMockLocalStorageService } from "@services/local-storage/local-storage.service.mock";

describe("LevelService", () => {
	let service: LevelService;
	let localStorageServiceMock: any;

	beforeEach(() => {
		localStorageServiceMock = createMockLocalStorageService();
		TestBed.configureTestingModule({
			providers: [
				LevelService,
				{ provide: LocalStorageService, useValue: localStorageServiceMock },
			],
		});
		service = TestBed.inject(LevelService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
