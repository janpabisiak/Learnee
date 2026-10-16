import { provideHttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
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

	describe("validateAnswer", () => {
		it("should return isCorrect true when answer matches gameData.isCorrect", () => {
			const result = service.validateAnswer({ isCorrect: true }, true);
			expect(result.isCorrect).toBeTrue();

			const resultFalse = service.validateAnswer({ isCorrect: false }, false);
			expect(resultFalse.isCorrect).toBeTrue();
		});

		it("should return isCorrect false when answer does not match gameData.isCorrect", () => {
			const result = service.validateAnswer({ isCorrect: true }, false);
			expect(result.isCorrect).toBeFalse();

			const resultFalse = service.validateAnswer({ isCorrect: false }, true);
			expect(resultFalse.isCorrect).toBeFalse();
		});

		it("should return isCorrect false when answer is null (skipped)", () => {
			const resultTrueData = service.validateAnswer({ isCorrect: true }, null);
			expect(resultTrueData.isCorrect).toBeFalse();

			const resultFalseData = service.validateAnswer({ isCorrect: false }, null);
			expect(resultFalseData.isCorrect).toBeFalse();
		});
	});
});
