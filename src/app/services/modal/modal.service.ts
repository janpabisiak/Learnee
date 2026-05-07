import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ModalService {
	private isWordAddingModalOpen = new BehaviorSubject<boolean>(false);
	private isWordDeletionModalOpen = new BehaviorSubject<boolean>(false);
	private isImportConfirmationModalOpen = new BehaviorSubject<boolean>(false);
	private isMobileNavbarOpen = new BehaviorSubject<boolean>(false);

	isWordAddingModalOpen$ = this.isWordAddingModalOpen.asObservable();
	isWordDeletionModalOpen$ = this.isWordDeletionModalOpen.asObservable();
	isImportConfirmationModalOpen$ = this.isImportConfirmationModalOpen.asObservable();
	isMobileNavbarOpen$ = this.isMobileNavbarOpen.asObservable();

	toggleModal(modalType: EModalType, state: boolean) {
		switch (modalType) {
			case EModalType.WordAdding:
				this.isWordAddingModalOpen.next(state);
				break;
			case EModalType.WordDeletion:
				this.isWordDeletionModalOpen.next(state);
				break;
			case EModalType.ImportConfirmation:
				this.isImportConfirmationModalOpen.next(state);
				break;
			case EModalType.MobileNavbar:
				this.isMobileNavbarOpen.next(state);
				break;
			default:
				break;
		}
	}
}

export enum EModalType {
	WordAdding,
	WordDeletion,
	ImportConfirmation,
	MobileNavbar,
}
