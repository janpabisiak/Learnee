import { Component, OnDestroy, OnInit } from "@angular/core";
import { ModalComponent } from "@components/utils/modal/modal.component";
import { ConfirmWordDeletionService } from "@services/confirm-word-deletion/confirm-word-deletion.service";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { IWord } from "../../../types/word.interface";
import { WordsService } from "@services/words/words.service";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { take } from "rxjs";
import { NgIf } from "@angular/common";

@Component({
	selector: "app-confirm-word-deletion-modal",
	imports: [ModalComponent, TranslatePipe, NgIf],
	templateUrl: "./confirm-word-deletion-modal.component.html",
})
export class ConfirmWordDeletionModalComponent implements OnInit, OnDestroy {
	word: IWord | null = null;
	purgeWords = false;
	translations: Record<string, string> | null = null;

	constructor(
		private modalService: ModalService,
		private wordsService: WordsService,
		private confirmWordDeletionService: ConfirmWordDeletionService,
		private translation: TranslateService
	) {}

	ngOnInit() {
		this.word = this.confirmWordDeletionService.word;
		this.purgeWords = this.confirmWordDeletionService.purgeWords;

		this.translation
			.get([
				"modal.delete.title",
				"modal.label.confirm",
				"modal.label.cancel",
				"modal.label.everything",
			])
			.pipe(take(1))
			.subscribe((translations) => {
				this.translations = translations;
			});
	}

	closeModal() {
		this.modalService.toggleModal(EModalType.WordDeletion, false);
	}

	confirmDeletion() {
		if (this.word) this.wordsService.removeWord(this.word.id);
		if (this.purgeWords) this.wordsService.purgeWordList();

		this.closeModal();
	}

	ngOnDestroy() {
		this.confirmWordDeletionService.destroy();
	}
}
