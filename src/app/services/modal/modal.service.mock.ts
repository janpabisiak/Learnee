import { BehaviorSubject } from "rxjs";

export const createMockModalService = () => ({
	isWordAddingModalOpen$: new BehaviorSubject<boolean>(false),
	isWordDeletionModalOpen$: new BehaviorSubject<boolean>(false),
	isImportConfirmationModalOpen$: new BehaviorSubject<boolean>(false),
	isMobileNavbarOpen$: new BehaviorSubject<boolean>(false),
	toggleModal: jasmine.createSpy("toggleShowWordAddingModal"),
});

export type IMockModalService = ReturnType<typeof createMockModalService>;
