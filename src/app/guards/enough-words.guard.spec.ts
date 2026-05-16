import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { provideTranslateService } from "@ngx-translate/core";
import { EnoughWordsGuard } from "./enough-words.guard";
import { WordsService } from "@services/words/words.service";
import { ToasterService } from "@services/toaster/toaster.service";
import { createMockWordsService } from "@services/words/words.service.mock";
import { createMockToasterService } from "@services/toaster/toaster.service.mock";

describe("EnoughWordsGuard", () => {
	let guard: EnoughWordsGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				EnoughWordsGuard,
				{ provide: WordsService, useValue: createMockWordsService() },
				{ provide: ToasterService, useValue: createMockToasterService() },
				{ provide: Router, useValue: { navigate: jasmine.createSpy("navigate") } },
				provideTranslateService(),
			],
		});
		guard = TestBed.inject(EnoughWordsGuard);
	});

	it("should be created", () => {
		expect(guard).toBeTruthy();
	});
});
