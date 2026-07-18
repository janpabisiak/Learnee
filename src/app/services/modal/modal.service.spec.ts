import { ModalService } from "./modal.service";
import { EModalType } from "@shared/constants/modal.constants";

describe("ModalService", () => {
	let service: ModalService;

	beforeEach(() => {
		service = new ModalService();
	});

	describe("toggleModal()", () => {
		it("should set word adding modal state", () => {
			service.toggleModal(EModalType.WordEdition, true);

			expect(service["wordEditionModalOpen"].value).toBeTrue();
		});

		it("should set word deletion modal state", () => {
			service.toggleModal(EModalType.WordDeletion, true);

			expect(service["wordDeletionModalOpen"].value).toBeTrue();
		});

		it("should set mobile navbar state", () => {
			service.toggleModal(EModalType.MobileNavbar, true);

			expect(service["mobileNavbarOpen"].value).toBeTrue();
		});

		it("should NOT change any visibility property if wrong modal type given", () => {
			service.toggleModal("wrong" as any, true);

			expect(service["wordEditionModalOpen"].value).toBeFalse();
			expect(service["wordDeletionModalOpen"].value).toBeFalse();
			expect(service["mobileNavbarOpen"].value).toBeFalse();
		});
	});
});
