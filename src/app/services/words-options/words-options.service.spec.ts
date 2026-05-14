import { TestBed } from "@angular/core/testing";
import { WordsOptionsService } from "./words-options.service";

describe("WordsOptionsService", () => {
	let service: WordsOptionsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [],
		});
		service = TestBed.inject(WordsOptionsService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
