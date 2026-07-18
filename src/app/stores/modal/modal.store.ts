import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ModalStore {
	private isWordAddingModalOpen = new BehaviorSubject<boolean>(false);
	private isWordDeletionModalOpen = new BehaviorSubject<boolean>(false);
	private isFolderAddingModalOpen = new BehaviorSubject<boolean>(false);
	private isFolderDeletionModalOpen = new BehaviorSubject<boolean>(false);
	private isAddToFolderModalOpen = new BehaviorSubject<boolean>(false);
	private isImportConfirmationModalOpen = new BehaviorSubject<boolean>(false);
	private isMobileNavbarOpen = new BehaviorSubject<boolean>(false);

	isWordAddingModalOpen$ = this.isWordAddingModalOpen.asObservable();
	isWordDeletionModalOpen$ = this.isWordDeletionModalOpen.asObservable();
	isFolderAddingModalOpen$ = this.isFolderAddingModalOpen.asObservable();
	isFolderDeletionModalOpen$ = this.isFolderDeletionModalOpen.asObservable();
	isAddToFolderModalOpen$ = this.isAddToFolderModalOpen.asObservable();
	isImportConfirmationModalOpen$ = this.isImportConfirmationModalOpen.asObservable();
	isMobileNavbarOpen$ = this.isMobileNavbarOpen.asObservable();

	setIsWordAddingModalOpen(value: boolean): void {
		this.isWordAddingModalOpen.next(value);
	}

	setIsWordDeletionModalOpen(value: boolean): void {
		this.isWordDeletionModalOpen.next(value);
	}

	setIsFolderAddingModalOpen(value: boolean): void {
		this.isFolderAddingModalOpen.next(value);
	}

	setIsFolderDeletionModalOpen(value: boolean): void {
		this.isFolderDeletionModalOpen.next(value);
	}

	setIsAddToFolderModalOpen(value: boolean): void {
		this.isAddToFolderModalOpen.next(value);
	}

	setIsImportConfirmationModalOpen(value: boolean): void {
		this.isImportConfirmationModalOpen.next(value);
	}

	setIsMobileNavbarOpen(value: boolean): void {
		this.isMobileNavbarOpen.next(value);
	}

	reset(): void {
		this.isWordAddingModalOpen.next(false);
		this.isWordDeletionModalOpen.next(false);
		this.isFolderAddingModalOpen.next(false);
		this.isFolderDeletionModalOpen.next(false);
		this.isAddToFolderModalOpen.next(false);
		this.isImportConfirmationModalOpen.next(false);
		this.isMobileNavbarOpen.next(false);
	}
}
