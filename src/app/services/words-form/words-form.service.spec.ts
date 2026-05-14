import { TestBed } from "@angular/core/testing";
import { WordsFormService } from "./words-form.service";
import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";
import { WordsService } from "@services/words/words.service";
import { createMockWordsService } from "@services/words/words.service.mock";

describe("WordsFormService", () => {
	let service: WordsFormService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(),
				provideTranslateService(),
				{ provide: WordsService, useValue: createMockWordsService() },
			],
		});
		service = TestBed.inject(WordsFormService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
