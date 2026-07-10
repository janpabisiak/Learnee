import { BehaviorSubject } from "rxjs";
import { IFolder } from "../../types/folder.interface";
import { EFolderSortTypes } from "@services/folders-options/folders-options.service";
import { IResultRange } from "../../types/resultRange.interface";

export const mockFolders: IFolder[] = [
	{
		id: 0,
		name: "test_name",
		description: "test_description",
		wordIds: [1, 2, 3],
	},
	{
		id: 1,
		name: "test_name_2",
		description: "test_description_2",
		wordIds: [2, 3],
	},
];

export const mockResultRange: IResultRange = {
	start: 0,
	end: 10,
};

export const createMockFoldersService = () => ({
	folders$: new BehaviorSubject<IFolder[]>([]),
	numberOfFolders$: new BehaviorSubject<number>(0),
	numberOfFilteredFolders$: new BehaviorSubject<number>(0),
	selectedIds$: new BehaviorSubject<number[]>([]),
	hasSelectedIds$: new BehaviorSubject<boolean>(false),
	singleFolderIdToOperateOn$: new BehaviorSubject<number | null>(null),
	sortType$: new BehaviorSubject<EFolderSortTypes>(EFolderSortTypes.IdDESC),
	searchQuery$: new BehaviorSubject<string>(""),
	visibleFolders$: new BehaviorSubject<IFolder[]>([]),
	page$: new BehaviorSubject<number>(1),
	maxPage$: new BehaviorSubject<number>(1),
	foldersPerPage$: new BehaviorSubject<number>(10),
	resultRange$: new BehaviorSubject<IResultRange>(mockResultRange),
	setSortType: jasmine.createSpy("setSortType"),
	setSearchQuery: jasmine.createSpy("setSearchQuery"),
	setPage: jasmine.createSpy("setPage"),
	setFoldersPerPage: jasmine.createSpy("setFoldersPerPage"),
	add: jasmine.createSpy("add"),
	delete: jasmine.createSpy("delete"),
	deleteMany: jasmine.createSpy("deleteMany"),
	edit: jasmine.createSpy("edit"),
	updateSingleFolderIdToOperateOn: jasmine.createSpy("updateSingleFolderIdToOperateOn"),
	toggleSelection: jasmine.createSpy("toggleSelection"),
	selectAllVisible: jasmine.createSpy("selectAllVisible"),
	unselectAll: jasmine.createSpy("unselectAll"),
	modifyFolderWordIds: jasmine.createSpy("modifyFolderWordIds"),
});

export type IMockFoldersService = ReturnType<typeof createMockFoldersService>;
