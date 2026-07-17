import { BehaviorSubject } from "rxjs";
import { EAvailableLanguages } from "@shared/constants/settings.constants";

export const createMockSettingsService = () => {
	const isDarkMode$ = new BehaviorSubject<boolean>(false);
	const isFetchWordDefinitionEnabled$ = new BehaviorSubject<boolean>(false);
	const isFetchWotdEnabled$ = new BehaviorSubject<boolean>(false);
	const isStatisticsEnabled$ = new BehaviorSubject<boolean>(false);
	const language$ = new BehaviorSubject<EAvailableLanguages>(EAvailableLanguages.English);
	const hasAnyWidgetVisible$ = new BehaviorSubject<boolean>(false);

	return {
		isDarkMode$,
		isFetchWordDefinitionEnabled$,
		isFetchWotdEnabled$,
		isStatisticsEnabled$,
		language$,
		hasAnyWidgetVisible$,
		setIsDarkMode: jasmine.createSpy("setIsDarkMode").and.callFake((val: boolean) => isDarkMode$.next(val)),
		setIsFetchWordDefinitionEnabled: jasmine.createSpy("setIsFetchWordDefinitionEnabled").and.callFake((val: boolean) => isFetchWordDefinitionEnabled$.next(val)),
		setIsFetchWotdEnabled: jasmine.createSpy("setIsFetchWotdEnabled").and.callFake((val: boolean) => isFetchWotdEnabled$.next(val)),
		setIsStatisticsEnabled: jasmine.createSpy("setIsStatisticsEnabled").and.callFake((val: boolean) => isStatisticsEnabled$.next(val)),
		setLanguage: jasmine.createSpy("setLanguage").and.callFake((val: EAvailableLanguages) => language$.next(val)),
		toggleDarkClass: jasmine.createSpy("toggleDarkClass"),
	};
};

export type IMockSettingsService = ReturnType<typeof createMockSettingsService>;
