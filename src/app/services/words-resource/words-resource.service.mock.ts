import { of } from "rxjs";

export const createMockWordsResourceService = () => ({
	saveData: jasmine.createSpy("saveData"),
	fetchDefinition$: jasmine.createSpy("fetchDefinition$").and.returnValue(of("mock definition")),
});

export type IMockWordsResourceService = ReturnType<typeof createMockWordsResourceService>;
