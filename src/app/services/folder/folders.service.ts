import { inject, Injectable } from "@angular/core";
import { IFolder } from "../../types/folder.interface";
import { FoldersStore } from "app/stores/folders/folders.store";
import { FoldersResourceService } from "@services/folders-resource/folders-resource.service";
import { EFolderSortTypes } from "@services/folders-options/folders-options.service";
import { map, take } from "rxjs";
import { DEFAULT_TOASTER_DURATION, EToasterTypes } from "@shared/constants/toaster.constants";
import { ToasterService } from "@services/toaster/toaster.service";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
	providedIn: "root",
})
export class FoldersService {
	private toasterService = inject(ToasterService);
	private translateService = inject(TranslateService);
	private foldersStore = inject(FoldersStore);
	private foldersResourceService = inject(FoldersResourceService);

	folders$ = this.foldersStore.folders$;
	numberOfFolders$ = this.foldersStore.numberOfFolders$;
	numberOfFilteredFolders$ = this.foldersStore.numberOfFilteredFolders$;
	selectedIds$ = this.foldersStore.selectedIds$;
	hasSelectedIds$ = this.foldersStore.hasSelectedIds$;
	folderToDeleteId$ = this.foldersStore.folderToDeleteId$;
	sortType$ = this.foldersStore.sortType$;
	searchQuery$ = this.foldersStore.searchQuery$;
	visibleFolders$ = this.foldersStore.visibleFolders$;
	page$ = this.foldersStore.page$;
	maxPage$ = this.foldersStore.maxPage$;
	foldersPerPage$ = this.foldersStore.foldersPerPage$;
	resultRange$ = this.foldersStore.resultRange$;

	private saveData(folders: IFolder[]) {
		this.foldersResourceService.saveData(folders);
	}

	private updateFolders(updatedFolders: IFolder[]) {
		this.foldersStore.setFolders(updatedFolders);
		this.saveData(updatedFolders);
	}

	setSortType(value: EFolderSortTypes) {
		this.foldersStore.setSortType(value);
	}

	setSearchQuery(query: string) {
		this.foldersStore.setSearchQuery(query);
	}

	setPage(page: number) {
		this.foldersStore.setPage(page);
	}

	setFoldersPerPage(amount: number) {
		this.foldersStore.setFoldersPerPage(amount);
	}

	add(name: string, description: string) {
		const folders = this.foldersStore.foldersValue;
		if (folders.some((f) => f.name === name)) {
			this.toasterService.addToaster({
				type: EToasterTypes.Error,
				content: this.translateService.instant("toaster.error.folder.alreadyExists"),
				duration: DEFAULT_TOASTER_DURATION,
			});

			return;
		}

		const newFolder: IFolder = {
			id: folders.length > 0 ? Math.max(...folders.map((f) => f.id)) + 1 : 0,
			name,
			description,
			wordIds: [],
		};

		const updatedFolders = [...folders, newFolder];
		this.updateFolders(updatedFolders);

		this.toasterService.addToaster({
			type: EToasterTypes.Success,
			content: this.translateService.instant("toaster.success.folder.added"),
			duration: DEFAULT_TOASTER_DURATION,
		});
	}

	delete(folderId: number) {
		const updatedFolders = this.foldersStore.foldersValue.filter((f) => f.id !== folderId);
		this.updateFolders(updatedFolders);

		this.toasterService.addToaster({
			type: EToasterTypes.Success,
			content: this.translateService.instant("toaster.success.folder.deleted"),
			duration: DEFAULT_TOASTER_DURATION,
		});

		this.foldersStore.setFolderToDeleteId(null);
	}

	deleteMany() {
		const selectedIds = this.foldersStore.selectedIdsValue;

		if (selectedIds.length > 0) {
			const updatedFolders = this.foldersStore.foldersValue.filter(
				(folder) => !selectedIds.includes(folder.id),
			);

			this.updateFolders(updatedFolders);
		} else {
			this.updateFolders([]);
		}

		this.toasterService.addToaster({
			type: EToasterTypes.Success,
			content: this.translateService.instant("toaster.success.folder.manyDeleted"),
			duration: DEFAULT_TOASTER_DURATION,
		});

		this.unselectAll();
	}

	edit(folderId: number, name: string, description: string) {
		const updatedFolders = [...this.foldersStore.foldersValue].map((f) =>
			f.id === folderId ? { ...f, name, description } : f,
		);

		this.updateFolders(updatedFolders);

		this.toasterService.addToaster({
			type: EToasterTypes.Success,
			content: this.translateService.instant("toaster.success.folder.edited"),
			duration: DEFAULT_TOASTER_DURATION,
		});
	}

	updateFolderToDeleteId(folderId: number | null) {
		this.foldersStore.setFolderToDeleteId(folderId);
	}

	toggleSelection(folderId: number) {
		const selectedIds = this.foldersStore.selectedIdsValue;
		const hasFolderSelected = selectedIds.includes(folderId);
		let updatedSelection: number[] = [];

		if (hasFolderSelected) {
			updatedSelection = selectedIds.filter((id) => id !== folderId);
		} else {
			updatedSelection = [...selectedIds, folderId];
		}

		this.foldersStore.setSelectedIds(updatedSelection);
	}

	selectAllVisible() {
		this.visibleFolders$
			.pipe(
				take(1),
				map((folders) => {
					const visibleFolderIds = folders.map((f) => f.id);
					return Array.from(
						new Set([...this.foldersStore.selectedIdsValue, ...visibleFolderIds]),
					);
				}),
			)
			.subscribe((updatedSelectedIds) => {
				this.foldersStore.setSelectedIds(updatedSelectedIds);
			});
	}

	unselectAll() {
		this.foldersStore.setSelectedIds([]);
	}
}
