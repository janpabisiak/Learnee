import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";
import { FillGapsListeningGameService } from "./fill-gaps-listening-game.service";

describe("FillGapsListeningGameService", () => {
	let service: FillGapsListeningGameService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient(), provideTranslateService()],
		});
		service = TestBed.inject(FillGapsListeningGameService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
