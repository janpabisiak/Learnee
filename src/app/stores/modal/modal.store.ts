import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ModalStore {
	private wordEditionModalOpen = new BehaviorSubject<boolean>(false);
	private wordDeletionModalOpen = new BehaviorSubject<boolean>(false);
	private folderEditionModalOpen = new BehaviorSubject<boolean>(false);
	private folderDeletionModalOpen = new BehaviorSubject<boolean>(false);
	private addToFolderModalOpen = new BehaviorSubject<boolean>(false);
	private importConfirmationModalOpen = new BehaviorSubject<boolean>(false);
	private mobileNavbarOpen = new BehaviorSubject<boolean>(false);

	wordEditionModalOpen$ = this.wordEditionModalOpen.asObservable();
	wordDeletionModalOpen$ = this.wordDeletionModalOpen.asObservable();
	folderEditionModalOpen$ = this.folderEditionModalOpen.asObservable();
	folderDeletionModalOpen$ = this.folderDeletionModalOpen.asObservable();
	addToFolderModalOpen$ = this.addToFolderModalOpen.asObservable();
	importConfirmationModalOpen$ = this.importConfirmationModalOpen.asObservable();
	mobileNavbarOpen$ = this.mobileNavbarOpen.asObservable();

	setWordEditionModalOpen(value: boolean): void {
		this.wordEditionModalOpen.next(value);
	}

	setWordDeletionModalOpen(value: boolean): void {
		this.wordDeletionModalOpen.next(value);
	}

	setFolderEditionModalOpen(value: boolean): void {
		this.folderEditionModalOpen.next(value);
	}

	setFolderDeletionModalOpen(value: boolean): void {
		this.folderDeletionModalOpen.next(value);
	}

	setAddToFolderModalOpen(value: boolean): void {
		this.addToFolderModalOpen.next(value);
	}

	setImportConfirmationModalOpen(value: boolean): void {
		this.importConfirmationModalOpen.next(value);
	}

	setMobileNavbarOpen(value: boolean): void {
		this.mobileNavbarOpen.next(value);
	}

	reset(): void {
		this.wordEditionModalOpen.next(false);
		this.wordDeletionModalOpen.next(false);
		this.folderEditionModalOpen.next(false);
		this.folderDeletionModalOpen.next(false);
		this.addToFolderModalOpen.next(false);
		this.importConfirmationModalOpen.next(false);
		this.mobileNavbarOpen.next(false);
	}
}
