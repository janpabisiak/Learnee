import { Component } from "@angular/core";
import { ButtonComponent } from "@components/utils/button/button.component";
import { ConfirmWordDeletionService } from "@services/confirm-word-deletion.service";
import { ModalService } from "@services/modal.service";

@Component({
	selector: "app-word-list-purger",
	imports: [ButtonComponent],
	templateUrl: "./word-list-purger.component.html",
})
export class WordListPurgerComponent {
	constructor(
		private modalService: ModalService,
		private confirmWordDeletionService: ConfirmWordDeletionService
	) {}

	openModal() {
		this.modalService.toggleShowWordDeletionModal(true);
		this.confirmWordDeletionService.purgeWords = true;
	}
}
