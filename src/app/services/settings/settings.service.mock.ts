export const createMockSettingsService = () => ({
	setIsDarkMode: jasmine.createSpy("setIsDarkMode"),
	setIsFetchWordDefinitionEnabled: jasmine.createSpy("setIsFetchWordDefinitionEnabled"),
	setLanguage: jasmine.createSpy("setLanguage"),
	toggleDarkClass: jasmine.createSpy("toggleDarkClass"),
});

export type IMockSettingsService = ReturnType<typeof createMockSettingsService>;
