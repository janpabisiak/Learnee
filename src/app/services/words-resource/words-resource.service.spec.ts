import { TestBed } from "@angular/core/testing";

import { WordsResourceService } from "./words-resource.service";
import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";

describe("WordsResourceService", () => {
	let service: WordsResourceService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient(), provideTranslateService()],
		});
		service = TestBed.inject(WordsResourceService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
