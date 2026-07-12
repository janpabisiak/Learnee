import {
	createMockLocalStorageService,
	IMockLocalStorageService,
} from "@services/local-storage/local-storage.service.mock";
import { SettingsService } from "./settings.service";
import { EAvailableLanguages } from "@shared/constants/settings.constants";
import { ELocalStorageKeys } from "@shared/constants/local-storage.constants";

describe("SettingsService", () => {
	let service: SettingsService;
	let mockLocalStorageService: IMockLocalStorageService;
	let mockRendererFactory: any;
	let mockTranslation: any;

	beforeEach(() => {
		mockLocalStorageService = createMockLocalStorageService();
		mockRendererFactory = {
			createRenderer: jasmine.createSpy("createRenderer").and.returnValue({
				addClass: jasmine.createSpy("addClass"),
				removeClass: jasmine.createSpy("removeClass"),
			}),
		};
		mockTranslation = {
			use: jasmine.createSpy("use"),
		};

		service = new SettingsService(
			mockRendererFactory,
			mockLocalStorageService as any,
			mockTranslation,
		);

		(service["renderer"].addClass as jasmine.Spy).calls.reset();
		(service["renderer"].removeClass as jasmine.Spy).calls.reset();
	});

	describe("setIsDarkMode()", () => {
		it("should update isDarkMode value", () => {
			service.setIsDarkMode(true);

			expect(service["isDarkMode"].value).toBeTrue();
		});

		it("should save chosen theme in localStorage", () => {
			service.setIsDarkMode(true);

			expect(service["localStorageService"].saveData).toHaveBeenCalledOnceWith(
				ELocalStorageKeys.DarkMode,
				true,
			);
		});

		it("should call toggleDarkClass method", () => {
			const spy = spyOn(service as any, "toggleDarkClass");
			service.setIsDarkMode(true);

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe("setLanguage()", () => {
		it("should update language value", () => {
			service.setLanguage(EAvailableLanguages.Polish);

			expect(service["language"].value).toBe(EAvailableLanguages.Polish);
		});

		it("should save chosen language in localStorage", () => {
			service.setLanguage(EAvailableLanguages.Polish);

			expect(service["localStorageService"].saveData).toHaveBeenCalledWith(
				ELocalStorageKeys.Language,
				EAvailableLanguages.Polish,
			);
		});

		it("should update translation service's language", () => {
			service.setLanguage(EAvailableLanguages.Polish);

			expect(service["translation"].use).toHaveBeenCalledWith(EAvailableLanguages.Polish);
		});
	});

	describe("toggleDarkClass()", () => {
		it("should add dark class to body element if isDarkMode is true", () => {
			service["isDarkMode"].next(true);
			service.toggleDarkClass();

			expect(service["renderer"].addClass).toHaveBeenCalledOnceWith(document.body, "dark");
		});

		it("should remove dark class from body element if isDarkMode is false", () => {
			service["isDarkMode"].next(false);
			service.toggleDarkClass();

			expect(service["renderer"].removeClass).toHaveBeenCalledOnceWith(document.body, "dark");
		});
	});
});
