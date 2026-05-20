import { of } from "rxjs";

export const createMockFoldersResourceService = () => ({
	saveData: jasmine.createSpy("saveData"),
	fetchDefinition$: jasmine.createSpy("fetchDefinition$").and.returnValue(of("mock definition")),
});

export type IMockFoldersResourceService = ReturnType<typeof createMockFoldersResourceService>;
