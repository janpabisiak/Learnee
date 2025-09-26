import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from "@angular/core";
import { SentenceCasePipe } from "../../../../pipes/sentence-case.pipe";
import { WebSpeechService } from "../../../../services/web-speech/web-speech.service";
import { IWord } from "../../../../types/word.interface";
import { AddWordFormService } from "@services/add-edit-word-form/add-edit-word-form.service";
import { WordsService } from "@services/words/words.service";
import { ModalService } from "@services/modal/modal.service";
import { ConfirmWordDeletionService } from "@services/confirm-word-deletion/confirm-word-deletion.service";
import { NgClass } from "@angular/common";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
	selector: "app-word-list-item",
	templateUrl: "./word-list-item.component.html",
	imports: [SentenceCasePipe, NgClass, TranslatePipe],
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WordListItemComponent {
	@Input({ required: true }) word!: IWord;
	isDropdownOpen = false;

	constructor(
		private addWordFormService: AddWordFormService,
		private webSpeechService: WebSpeechService,
		private wordsService: WordsService,
		private modalService: ModalService,
		private confirmWordDeletionService: ConfirmWordDeletionService
	) {}

	readWord() {
		if (this.word.name) this.webSpeechService.readText(this.word.name);
	}

	readWordDefinition() {
		if (this.word.definition) this.webSpeechService.readText(this.word.definition);
	}

	editWord() {
		this.modalService.toggleShowWordAddingModal(true);
		this.addWordFormService.setupForEditing(this.word);
		this.toggleDropdownMenu();
	}

	toggleIsLearning() {
		this.wordsService.toggleIsLearning(this.word.id);
	}

	toggleDropdownMenu() {
		this.isDropdownOpen = !this.isDropdownOpen;
	}

	deleteWord() {
		this.modalService.toggleShowWordDeletionModal(true);
		this.confirmWordDeletionService.word = this.word;
		this.toggleDropdownMenu();
	}
}
