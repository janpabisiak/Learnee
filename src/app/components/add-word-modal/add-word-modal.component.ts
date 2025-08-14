import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from "@angular/core";
import { ModalService } from "@services/modal.service";
import { ModalComponent } from "@components/utils/modal/modal.component";

@Component({
	selector: "app-add-word-modal",
	standalone: true,
	templateUrl: "./add-word-modal.component.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	imports: [ModalComponent],
})
export class AddWordModalComponent {
	modalService = inject(ModalService);

	toggleIsAddWordModalOpen(state: boolean) {
		this.modalService.toggleIsWordAddingModalOpen(state);
	}
}
