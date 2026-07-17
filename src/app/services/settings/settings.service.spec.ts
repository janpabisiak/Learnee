import { TestBed } from "@angular/core/testing";
import { RendererFactory2 } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { SettingsResourceService } from "@services/settings-resource/settings-resource.service";
import { SettingsStore } from "app/stores/settings/settings.store";
import { SettingsService } from "./settings.service";
import {
	createMockLocalStorageService,
	IMockLocalStorageService,
} from "@services/local-storage/local-storage.service.mock";
import { ELocalStorageKeys } from "@shared/constants/local-storage.constants";
import { EAvailableLanguages } from "@shared/constants/settings.constants";

describe("SettingsService", () => {
	let service: SettingsService;
	let store: SettingsStore;
	let mockLocalStorageService: IMockLocalStorageService;
	let mockRendererFactory: any;
	let mockRenderer: any;
	let mockTranslateService: any;
	let mockSettingsResourceService: any;

	beforeEach(() => {
		mockLocalStorageService = createMockLocalStorageService();
		mockRenderer = {
			addClass: jasmine.createSpy("addClass"),
			removeClass: jasmine.createSpy("removeClass"),
		};
		mockRendererFactory = {
			createRenderer: jasmine.createSpy("createRenderer").and.returnValue(mockRenderer),
		};
		mockTranslateService = {
			use: jasmine.createSpy("use"),
		};
		mockSettingsResourceService = {
			load: jasmine.createSpy("load"),
			save: jasmine.createSpy("save"),
		};

		TestBed.configureTestingModule({
			providers: [
				SettingsService,
				SettingsStore,
				{ provide: RendererFactory2, useValue: mockRendererFactory },
				{ provide: LocalStorageService, useValue: mockLocalStorageService },
				{ provide: TranslateService, useValue: mockTranslateService },
				{ provide: SettingsResourceService, useValue: mockSettingsResourceService },
			],
		});

		store = TestBed.inject(SettingsStore);
		store.setIsDarkMode(false);
		store.setLanguage(EAvailableLanguages.English);
		store.setIsFetchWotdEnabled(false);
		store.setIsStatisticsEnabled(false);

		service = TestBed.inject(SettingsService);
	});

	it("should call load on settingsResourceService and use initial language in translateService", () => {
		expect(mockSettingsResourceService.load).toHaveBeenCalledTimes(1);
		expect(mockTranslateService.use).toHaveBeenCalledWith(EAvailableLanguages.English);
	});

	describe("setIsDarkMode()", () => {
		it("should update isDarkMode in store and save to resource service", () => {
			service.setIsDarkMode(true);

			expect(store.isDarkModeValue).toBeTrue();
			expect(mockSettingsResourceService.save).toHaveBeenCalledWith({
				key: ELocalStorageKeys.DarkMode,
				value: true,
			});
		});

		it("should call toggleDarkClass method", () => {
			const spy = spyOn(service, "toggleDarkClass");
			service.setIsDarkMode(true);

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe("setIsFetchWordDefinitionEnabled()", () => {
		it("should update isFetchWordDefinitionEnabled in store and save to resource service", (done) => {
			service.setIsFetchWordDefinitionEnabled(true);

			store.isFetchWordDefinitionEnabled$.subscribe((val) => {
				expect(val).toBeTrue();
				expect(mockSettingsResourceService.save).toHaveBeenCalledWith({
					key: ELocalStorageKeys.FetchWordDefinition,
					value: true,
				});
				done();
			});
		});
	});

	describe("setIsFetchWotdEnabled()", () => {
		it("should update isFetchWotdEnabled in store and save to resource service", (done) => {
			service.setIsFetchWotdEnabled(true);

			store.isFetchWotdEnabled$.subscribe((val) => {
				expect(val).toBeTrue();
				expect(mockSettingsResourceService.save).toHaveBeenCalledWith({
					key: ELocalStorageKeys.FetchWotd,
					value: true,
				});
				done();
			});
		});
	});

	describe("setIsStatisticsEnabled()", () => {
		it("should update isStatisticsEnabled in store and save to resource service", (done) => {
			service.setIsStatisticsEnabled(true);

			store.isStatisticsEnabled$.subscribe((val) => {
				expect(val).toBeTrue();
				expect(mockSettingsResourceService.save).toHaveBeenCalledWith({
					key: ELocalStorageKeys.StatisticsEnabled,
					value: true,
				});
				done();
			});
		});
	});

	describe("setLanguage()", () => {
		it("should update language in store, save to local storage, and use in translate service", () => {
			service.setLanguage(EAvailableLanguages.Polish);

			expect(store.languageValue).toBe(EAvailableLanguages.Polish);
			expect(mockLocalStorageService.saveData).toHaveBeenCalledWith(
				ELocalStorageKeys.Language,
				EAvailableLanguages.Polish,
			);
			expect(mockTranslateService.use).toHaveBeenCalledWith(EAvailableLanguages.Polish);
		});
	});

	describe("toggleDarkClass()", () => {
		it("should add dark class to body element if isDarkModeValue is true", () => {
			store.setIsDarkMode(true);
			service.toggleDarkClass();

			expect(mockRenderer.addClass).toHaveBeenCalledOnceWith(document.body, "dark");
		});

		it("should remove dark class from body element if isDarkModeValue is false", () => {
			store.setIsDarkMode(false);
			service.toggleDarkClass();

			expect(mockRenderer.removeClass).toHaveBeenCalledOnceWith(document.body, "dark");
		});
	});
});
