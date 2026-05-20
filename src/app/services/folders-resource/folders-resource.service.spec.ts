import { TestBed } from "@angular/core/testing";

import { FoldersResourceService } from "./folders-resource.service";

describe("FoldersResourceService", () => {
	let service: FoldersResourceService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FoldersResourceService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
