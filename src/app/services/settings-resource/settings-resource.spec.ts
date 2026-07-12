import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { SettingsStore } from "app/stores/settings/settings.store";
import { SettingsResourceService } from "./settings-resource.service";

describe("SettingsResourceService", () => {
	let service: SettingsResourceService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SettingsStore, LocalStorageService],
		});
		service = TestBed.inject(SettingsResourceService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
