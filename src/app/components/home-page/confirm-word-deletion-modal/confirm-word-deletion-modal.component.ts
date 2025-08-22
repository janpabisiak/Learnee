import { Component } from "@angular/core";
import { ModalComponent } from "@components/utils/modal/modal.component";
import { ConfirmWordDeletionService } from "@services/confirm-word-deletion.service";
import { ModalService } from "@services/modal.service";
import { IWord } from "../../../types/word.interface";
import { WordsService } from "@services/words.service";

@Component({
	selector: "app-confirm-word-deletion-modal",
	imports: [ModalComponent],
	templateUrl: "./confirm-word-deletion-modal.component.html",
})
export class ConfirmWordDeletionModalComponent {
	word: IWord | null = null;

	constructor(
		private modalService: ModalService,
		private wordsService: WordsService,
		private confirmWordDeletionService: ConfirmWordDeletionService
	) {
		this.word = this.confirmWordDeletionService.word;
	}

	closeModal() {
		this.modalService.toggleShowWordDeletionModal(false);
	}

	confirmDeletion() {
		if (this.word) {
			this.wordsService.removeWord(this.word.id);
			this.closeModal();
		}
	}
}
