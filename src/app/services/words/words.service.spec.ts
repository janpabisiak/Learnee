import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";
import { WordsService } from "./words.service";

describe("WordsService", () => {
	let service: WordsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient(), provideTranslateService()],
		});
		service = TestBed.inject(WordsService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
