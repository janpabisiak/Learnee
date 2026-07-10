import { TestBed } from "@angular/core/testing";

import { FoldersStore } from "./folders.store";

describe("FoldersStore", () => {
	let service: FoldersStore;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FoldersStore);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
