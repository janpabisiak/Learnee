import { TestBed } from "@angular/core/testing";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { SettingsStore } from "app/stores/settings/settings.store";
import { SettingsResourceService } from "./settings-resource.service";
import {
	createMockLocalStorageService,
	IMockLocalStorageService,
} from "@services/local-storage/local-storage.service.mock";
import { ELocalStorageKeys } from "@shared/constants/local-storage.constants";
import { EAvailableLanguages } from "@shared/constants/settings.constants";

describe("SettingsResourceService", () => {
	let service: SettingsResourceService;
	let mockLocalStorageService: IMockLocalStorageService;
	let store: SettingsStore;

	beforeEach(() => {
		mockLocalStorageService = createMockLocalStorageService();

		TestBed.configureTestingModule({
			providers: [
				SettingsResourceService,
				SettingsStore,
				{ provide: LocalStorageService, useValue: mockLocalStorageService },
			],
		});
		service = TestBed.inject(SettingsResourceService);
		store = TestBed.inject(SettingsStore);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("load()", () => {
		it("should load settings from local storage and update store", () => {
			mockLocalStorageService.loadData.and.callFake((key: ELocalStorageKeys) => {
				if (key === ELocalStorageKeys.DarkMode) return true;
				if (key === ELocalStorageKeys.FetchWordDefinition) return true;
				if (key === ELocalStorageKeys.Language) return EAvailableLanguages.Polish;
				if (key === ELocalStorageKeys.FetchWotd) return false;
				if (key === ELocalStorageKeys.StatisticsEnabled) return false;
				return null;
			});

			service.load();

			expect(store.isDarkModeValue).toBeTrue();
			expect(store.languageValue).toBe(EAvailableLanguages.Polish);

			let isFetchWordDefinitionEnabled = false;
			store.isFetchWordDefinitionEnabled$.subscribe(
				(val) => (isFetchWordDefinitionEnabled = val),
			);
			expect(isFetchWordDefinitionEnabled).toBeTrue();

			let isFetchWotdEnabled = true;
			store.isFetchWotdEnabled$.subscribe((val) => (isFetchWotdEnabled = val));
			expect(isFetchWotdEnabled).toBeFalse();

			let isStatisticsEnabled = true;
			store.isStatisticsEnabled$.subscribe((val) => (isStatisticsEnabled = val));
			expect(isStatisticsEnabled).toBeFalse();
		});

		it("should use default settings when local storage is empty", () => {
			mockLocalStorageService.loadData.and.returnValue(null);

			service.load();

			expect(store.isDarkModeValue).toBeFalse();
			expect(store.languageValue).toBe(EAvailableLanguages.English);

			let isFetchWordDefinitionEnabled = true;
			store.isFetchWordDefinitionEnabled$.subscribe(
				(val) => (isFetchWordDefinitionEnabled = val),
			);
			expect(isFetchWordDefinitionEnabled).toBeFalse();

			let isFetchWotdEnabled = false;
			store.isFetchWotdEnabled$.subscribe((val) => (isFetchWotdEnabled = val));
			expect(isFetchWotdEnabled).toBeTrue();

			let isStatisticsEnabled = false;
			store.isStatisticsEnabled$.subscribe((val) => (isStatisticsEnabled = val));
			expect(isStatisticsEnabled).toBeTrue();
		});
	});

	describe("save()", () => {
		it("should save settings using localStorageService", () => {
			service.save({ key: ELocalStorageKeys.DarkMode, value: true });
			expect(mockLocalStorageService.saveData).toHaveBeenCalledWith(
				ELocalStorageKeys.DarkMode,
				true,
			);

			service.save({ key: ELocalStorageKeys.FetchWotd, value: false });
			expect(mockLocalStorageService.saveData).toHaveBeenCalledWith(
				ELocalStorageKeys.FetchWotd,
				false,
			);
		});
	});
});
