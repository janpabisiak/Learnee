import { EModalType, ModalService } from "./modal.service";

describe("ModalService", () => {
	let service: ModalService;

	beforeEach(() => {
		service = new ModalService();
	});

	describe("toggleModal()", () => {
		it("should set word adding modal state", () => {
			service.toggleModal(EModalType.WordAdding, true);

			expect(service["isWordAddingModalOpen"].value).toBeTrue();
		});

		it("should set word deletion modal state", () => {
			service.toggleModal(EModalType.WordDeletion, true);

			expect(service["isWordDeletionModalOpen"].value).toBeTrue();
		});

		it("should set mobile navbar state", () => {
			service.toggleModal(EModalType.MobileNavbar, true);

			expect(service["isMobileNavbarOpen"].value).toBeTrue();
		});

		it("should NOT change any visibility property if wrong modal type given", () => {
			service.toggleModal("wrong" as any, true);

			expect(service["isWordAddingModalOpen"].value).toBeFalse();
			expect(service["isWordDeletionModalOpen"].value).toBeFalse();
			expect(service["isMobileNavbarOpen"].value).toBeFalse();
		});
	});
});
