import { inject, Injectable } from "@angular/core";
import { IFolder } from "../../types/folder.interface";
import { BehaviorSubject, combineLatest, map } from "rxjs";
import {
	EFolderSortTypes,
	FoldersOptionsService,
} from "../../services/folders-options/folders-options.service";
import { DEFAULT_ITEMS_PER_PAGE } from "@shared/constants/pagination.constants";

@Injectable({
	providedIn: "root",
})
export class FoldersStore {
	private foldersOptionsService = inject(FoldersOptionsService);

	private folders = new BehaviorSubject<IFolder[]>([]);
	private numberOfFilteredFolders = new BehaviorSubject<number>(0);
	private selectedIds = new BehaviorSubject<number[]>([]);
	private singleFolderIdToOperateOn = new BehaviorSubject<number | null>(null);
	private sortType = new BehaviorSubject<EFolderSortTypes>(EFolderSortTypes.IdDESC);
	private searchQuery = new BehaviorSubject<string>("");
	private page = new BehaviorSubject<number>(1);
	private foldersPerPage = new BehaviorSubject<number>(DEFAULT_ITEMS_PER_PAGE);
	private maxPage = new BehaviorSubject<number>(1);

	folders$ = this.folders.asObservable();
	numberOfFolders$ = this.folders.pipe(map((folders) => folders.length));
	numberOfFilteredFolders$ = this.numberOfFilteredFolders.asObservable();
	selectedIds$ = this.selectedIds.asObservable();
	hasSelectedIds$ = this.selectedIds.pipe(map((ids) => ids.length > 0));
	singleFolderIdToOperateOn$ = this.singleFolderIdToOperateOn.asObservable();
	sortType$ = this.sortType.asObservable();
	searchQuery$ = this.searchQuery.asObservable();
	page$ = this.page.asObservable();
	foldersPerPage$ = this.foldersPerPage.asObservable();
	maxPage$ = this.maxPage.asObservable();

	filteredFolders$ = combineLatest([this.folders$, this.sortType$, this.searchQuery$]).pipe(
		map(([folders, sortType, searchQuery]) => {
			let result = this.foldersOptionsService.sort(folders, sortType);

			if (searchQuery) {
				result = this.foldersOptionsService.filter(result, searchQuery);
			}

			this.numberOfFilteredFolders.next(result.length);
			return result;
		}),
	);

	resultRange$ = combineLatest([
		this.page$,
		this.foldersPerPage$,
		this.numberOfFilteredFolders$,
	]).pipe(
		map(([page, foldersPerPage, count]) => ({
			start: (page - 1) * foldersPerPage,
			end: Math.min((page - 1) * foldersPerPage + foldersPerPage, count),
		})),
	);

	maxPageCalculated$ = combineLatest([this.numberOfFilteredFolders$, this.foldersPerPage$]).pipe(
		map(([count, perPage]) => {
			const max = Math.ceil(count / perPage) || 1;
			if (this.page.value > max) {
				this.page.next(max);
			}
			this.maxPage.next(max);
			return max;
		}),
	);

	visibleFolders$ = combineLatest([
		this.filteredFolders$,
		this.resultRange$,
		this.maxPageCalculated$,
	]).pipe(
		map(([filteredFolders, resultRange]) => {
			return this.foldersOptionsService.paginate(filteredFolders, resultRange);
		}),
	);

	get foldersValue() {
		return this.folders.value;
	}

	setFolders(value: IFolder[]) {
		this.folders.next(value);
	}

	get selectedIdsValue() {
		return this.selectedIds.value;
	}

	setSelectedIds(value: number[]) {
		this.selectedIds.next(value);
	}

	get singleFolderIdToOperateOnValue() {
		return this.singleFolderIdToOperateOn.value;
	}

	setSingleFolderIdToOperateOn(value: number | null) {
		this.singleFolderIdToOperateOn.next(value);
	}

	setSortType(value: EFolderSortTypes) {
		this.sortType.next(value);
	}

	setSearchQuery(value: string) {
		this.searchQuery.next(value);
	}

	setNumberOfFilteredFolders(value: number) {
		this.numberOfFilteredFolders.next(value);
	}

	setPage(value: number) {
		return value < 1 || value > this.maxPage.value ? this.page.next(1) : this.page.next(value);
	}

	setFoldersPerPage(value: number) {
		this.foldersPerPage.next(value);
	}
}
