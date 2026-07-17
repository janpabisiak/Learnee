export const createMockSettingsResourceService = () => ({
	load: jasmine.createSpy("load"),
	save: jasmine.createSpy("save"),
});

export type IMockSettingsResourceService = ReturnType<typeof createMockSettingsResourceService>;
