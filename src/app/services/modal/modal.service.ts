import { inject, Injectable } from "@angular/core";
import { EModalType } from "@shared/constants/modal.constants";
import { ModalStore } from "app/stores/modal/modal.store";

@Injectable({
	providedIn: "root",
})
export class ModalService {
	private modalStore = inject(ModalStore);
	private storeUpdaters: Record<EModalType, (isOpen: boolean) => void> = {
		[EModalType.WordEdition]: (isOpen) => this.modalStore.setWordEditionModalOpen(isOpen),
		[EModalType.WordDeletion]: (isOpen) => this.modalStore.setWordDeletionModalOpen(isOpen),
		[EModalType.FolderEdition]: (isOpen) => this.modalStore.setFolderEditionModalOpen(isOpen),
		[EModalType.FolderDeletion]: (isOpen) => this.modalStore.setFolderDeletionModalOpen(isOpen),
		[EModalType.AddToFolder]: (isOpen) => this.modalStore.setAddToFolderModalOpen(isOpen),
		[EModalType.ImportConfirmation]: (isOpen) =>
			this.modalStore.setImportConfirmationModalOpen(isOpen),
		[EModalType.MobileNavbar]: (isOpen) => this.modalStore.setMobileNavbarOpen(isOpen),
	};

	wordEditionModalOpen$ = this.modalStore.wordEditionModalOpen$;
	wordDeletionModalOpen$ = this.modalStore.wordDeletionModalOpen$;
	folderEditionModalOpen$ = this.modalStore.folderEditionModalOpen$;
	folderDeletionModalOpen$ = this.modalStore.folderDeletionModalOpen$;
	addToFolderModalOpen$ = this.modalStore.addToFolderModalOpen$;
	importConfirmationModalOpen$ = this.modalStore.importConfirmationModalOpen$;
	mobileNavbarOpen$ = this.modalStore.mobileNavbarOpen$;

	toggleModal(modalType: EModalType, state: boolean) {
		if (state) {
			this.modalStore.reset();
		}

		this.storeUpdaters[modalType](state);
	}
}
