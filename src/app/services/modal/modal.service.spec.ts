import { TestBed } from "@angular/core/testing";
import { EModalType } from "@shared/constants/modal.constants";
import { ModalStore } from "app/stores/modal/modal.store";
import { ModalService } from "./modal.service";

describe("ModalService", () => {
	let service: ModalService;
	let modalStore: ModalStore;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ModalService, ModalStore],
		});
		service = TestBed.inject(ModalService);
		modalStore = TestBed.inject(ModalStore);
	});

	describe("toggleModal()", () => {
		it("should set word adding modal state", () => {
			service.toggleModal(EModalType.WordEdition, true);

			expect(modalStore["wordEditionModalOpen"].value).toBeTrue();
		});

		it("should set word deletion modal state", () => {
			service.toggleModal(EModalType.WordDeletion, true);

			expect(modalStore["wordDeletionModalOpen"].value).toBeTrue();
		});

		it("should set mobile navbar state", () => {
			service.toggleModal(EModalType.MobileNavbar, true);

			expect(modalStore["mobileNavbarOpen"].value).toBeTrue();
		});

		it("should NOT change any visibility property if wrong modal type given", () => {
			service.toggleModal("wrong" as any, true);

			expect(modalStore["wordEditionModalOpen"].value).toBeFalse();
			expect(modalStore["wordDeletionModalOpen"].value).toBeFalse();
			expect(modalStore["mobileNavbarOpen"].value).toBeFalse();
		});
	});
});
