import { inject, Injectable } from "@angular/core";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { IFolder } from "../../types/folder.interface";
import { FoldersStore } from "app/stores/folders/folders.store";
import { ELocalStorageKeys } from "@shared/constants/local-storage.constants";

@Injectable({
	providedIn: "root",
})
export class FoldersResourceService {
	private localStorageService = inject(LocalStorageService);
	private foldersStore = inject(FoldersStore);

	constructor() {
		this.load();
	}

	saveData(folders: IFolder[]) {
		this.localStorageService.saveData(ELocalStorageKeys.FolderList, folders);
	}

	private load() {
		const folders = this.localStorageService.loadData(ELocalStorageKeys.FolderList);
		if (folders) {
			this.foldersStore.setFolders(folders);
		}
	}
}
