import { TestBed } from "@angular/core/testing";

import { FoldersOptionsService } from "./folders-options.service";

describe("FoldersOptionsService", () => {
	let service: FoldersOptionsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FoldersOptionsService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
