import { Component } from "@angular/core";
import { ButtonComponent } from "@components/utils/button/button.component";
import { TranslatePipe } from "@ngx-translate/core";
import { ConfirmWordDeletionService } from "@services/confirm-word-deletion/confirm-word-deletion.service";
import { ModalService } from "@services/modal/modal.service";

@Component({
	selector: "app-word-list-purger",
	imports: [ButtonComponent, TranslatePipe],
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
