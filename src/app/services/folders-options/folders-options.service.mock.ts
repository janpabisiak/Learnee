import { IResultRange } from "../../types/resultRange.interface";
import { IFolder } from "../../types/folder.interface";
import { EFolderSortTypes } from "./folders-options.service";

export const createMockFoldersOptionsService = () => ({
	sort: jasmine
		.createSpy("sort")
		.and.callFake((folderList: IFolder[], _sortType: EFolderSortTypes) => folderList),
	filter: jasmine
		.createSpy("filter")
		.and.callFake((folderList: IFolder[], _query: string) => folderList),
	paginate: jasmine
		.createSpy("paginate")
		.and.callFake((folderList: IFolder[], _resultRange: IResultRange) => folderList),
});

export type IMockFoldersOptionsService = ReturnType<typeof createMockFoldersOptionsService>;
