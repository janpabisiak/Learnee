import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";
import { TrueFalseGameService } from "./true-false-game.service";

describe("TrueFalseGameService", () => {
	let service: TrueFalseGameService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient(), provideTranslateService()],
		});
		service = TestBed.inject(TrueFalseGameService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
