import { TestBed } from "@angular/core/testing";
import { provideTranslateService } from "@ngx-translate/core";
import { FoldersService } from "./folders.service";

describe("FoldersService", () => {
	let service: FoldersService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideTranslateService()],
		});
		service = TestBed.inject(FoldersService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
