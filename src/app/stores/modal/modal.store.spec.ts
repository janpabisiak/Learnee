import { TestBed } from "@angular/core/testing";

import { ModalStore } from "./modal.store";

describe("ModalStore", () => {
	let service: ModalStore;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ModalStore);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
