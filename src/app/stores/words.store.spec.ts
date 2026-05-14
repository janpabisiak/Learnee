import { TestBed } from "@angular/core/testing";

import { WordsStore } from "./words.store";

describe("WordsStore", () => {
	let service: WordsStore;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(WordsStore);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
