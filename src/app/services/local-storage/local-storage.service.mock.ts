import { BehaviorSubject } from "rxjs";

export const createMockLocalStorageService = () => ({
	hasKeys$: new BehaviorSubject<boolean>(false),
	loadData: jasmine.createSpy("loadData"),
	saveData: jasmine.createSpy("saveData"),
	exportData: jasmine.createSpy("exportData"),
	deleteData: jasmine.createSpy("deleteData"),
	setImportedData: jasmine.createSpy("setImportedData"),
	getImportedData: jasmine.createSpy("getImportedData"),
	importData: jasmine.createSpy("importData"),
	reloadPage: jasmine.createSpy("reloadPage"),
});

export type IMockLocalStorageService = ReturnType<typeof createMockLocalStorageService>;
