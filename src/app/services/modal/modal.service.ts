import { inject, Injectable } from "@angular/core";
import { EModalType } from "@shared/constants/modal.constants";
import { ModalStore } from "app/stores/modal/modal.store";

@Injectable({
	providedIn: "root",
})
export class ModalService {
	private modalStore = inject(ModalStore);
	private storeUpdaters: Record<EModalType, (isOpen: boolean) => void> = {
		[EModalType.WordAdding]: (isOpen) => this.modalStore.setIsWordAddingModalOpen(isOpen),
		[EModalType.WordDeletion]: (isOpen) => this.modalStore.setIsWordDeletionModalOpen(isOpen),
		[EModalType.FolderAdding]: (isOpen) => this.modalStore.setIsFolderAddingModalOpen(isOpen),
		[EModalType.FolderDeletion]: (isOpen) =>
			this.modalStore.setIsFolderDeletionModalOpen(isOpen),
		[EModalType.AddToFolder]: (isOpen) => this.modalStore.setIsAddToFolderModalOpen(isOpen),
		[EModalType.ImportConfirmation]: (isOpen) =>
			this.modalStore.setIsImportConfirmationModalOpen(isOpen),
		[EModalType.MobileNavbar]: (isOpen) => this.modalStore.setIsMobileNavbarOpen(isOpen),
	};

	isWordAddingModalOpen$ = this.modalStore.isWordAddingModalOpen$;
	isWordDeletionModalOpen$ = this.modalStore.isWordDeletionModalOpen$;
	isFolderAddingModalOpen$ = this.modalStore.isFolderAddingModalOpen$;
	isFolderDeletionModalOpen$ = this.modalStore.isFolderDeletionModalOpen$;
	isAddToFolderModalOpen$ = this.modalStore.isAddToFolderModalOpen$;
	isImportConfirmationModalOpen$ = this.modalStore.isImportConfirmationModalOpen$;
	isMobileNavbarOpen$ = this.modalStore.isMobileNavbarOpen$;

	toggleModal(modalType: EModalType, state: boolean) {
		if (state) {
			this.modalStore.reset();
		}

		this.storeUpdaters[modalType](state);
	}
}
