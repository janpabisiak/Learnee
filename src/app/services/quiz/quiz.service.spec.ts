import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";
import { QuizService } from "./quiz.service";

describe("QuizService", () => {
	let service: QuizService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient(), provideTranslateService()],
		});
		service = TestBed.inject(QuizService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
