export const createMockFoldersResourceService = () => ({
	saveData: jasmine.createSpy("saveData"),
});

export type IMockFoldersResourceService = ReturnType<typeof createMockFoldersResourceService>;
