import { BehaviorSubject } from "rxjs";
import { EAvailableLanguages } from "./settings.service";

export const createMockSettingsService = () => ({
	isDarkMode$: new BehaviorSubject<boolean>(false),
	isFetchWordDefinitionEnabled$: new BehaviorSubject<boolean>(true),
	currentLanguage$: new BehaviorSubject<EAvailableLanguages>(EAvailableLanguages.English),
	setIsDarkMode: jasmine.createSpy("setIsDarkMode"),
	setIsFetchWordDefinitionEnabled: jasmine.createSpy("setIsFetchWordDefinitionEnabled"),
	setCurrentLanguage: jasmine.createSpy("setCurrentLanguage"),
	toggleDarkClass: jasmine.createSpy("toggleDarkClass"),
});

export type IMockSettingsService = ReturnType<typeof createMockSettingsService>;
