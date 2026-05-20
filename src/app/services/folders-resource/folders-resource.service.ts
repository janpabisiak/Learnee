import { inject, Injectable } from "@angular/core";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { IFolder } from "../../types/folder.interface";
import { FoldersStore } from "app/stores/folders/folders.store";

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
		this.localStorageService.saveData("folder-list", folders);
	}

	private load() {
		const folders = this.localStorageService.loadData("folder-list");
		if (folders) {
			this.foldersStore.setFolders(folders);
		}
	}
}
