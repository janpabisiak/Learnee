import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";
import { MatchingGameService } from "./matching-game.service";

describe("MatchingGameService", () => {
	let service: MatchingGameService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient(), provideTranslateService()],
		});
		service = TestBed.inject(MatchingGameService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
