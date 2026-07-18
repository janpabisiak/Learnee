import { BehaviorSubject } from "rxjs";

export const createMockModalService = () => ({
	wordEditionModalOpen$: new BehaviorSubject<boolean>(false),
	wordDeletionModalOpen$: new BehaviorSubject<boolean>(false),
	folderEditionModalOpen$: new BehaviorSubject<boolean>(false),
	folderDeletionModalOpen$: new BehaviorSubject<boolean>(false),
	addToFolderModalOpen$: new BehaviorSubject<boolean>(false),
	importConfirmationModalOpen$: new BehaviorSubject<boolean>(false),
	mobileNavbarOpen$: new BehaviorSubject<boolean>(false),
	toggleModal: jasmine.createSpy("toggleModal"),
});

export type IMockModalService = ReturnType<typeof createMockModalService>;
