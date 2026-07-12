import { SettingsStore } from "./settings.store";

describe("SettingsStore", () => {
	let service: SettingsStore;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(SettingsStore);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
