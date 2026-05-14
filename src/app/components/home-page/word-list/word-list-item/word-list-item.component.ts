import { NgClass } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { WordsFormService } from "@services/words-form/words-form.service";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { WordsService } from "@services/words/words.service";
import { Subject, takeUntil } from "rxjs";
import { SentenceCasePipe } from "../../../../pipes/sentence-case.pipe";
import { WebSpeechService } from "../../../../services/web-speech/web-speech.service";
import { IWord } from "../../../../types/word.interface";

@Component({
	selector: "app-word-list-item",
	templateUrl: "./word-list-item.component.html",
	imports: [SentenceCasePipe, NgClass, TranslatePipe],
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WordListItemComponent implements OnInit, OnDestroy {
	@Input({ required: true }) word!: IWord;
	isWordSelected = false;
	isDropdownOpen = false;
	private destroy$ = new Subject<void>();

	constructor(
		private wordsFormService: WordsFormService,
		private webSpeechService: WebSpeechService,
		private wordsService: WordsService,
		private modalService: ModalService,
	) {}

	ngOnInit() {
		this.wordsService.selectedIds$.pipe(takeUntil(this.destroy$)).subscribe((selectedIds) => {
			this.isWordSelected = selectedIds.includes(this.word.id);
		});
	}

	readWord() {
		if (this.word.name) this.webSpeechService.readText(this.word.name);
	}

	readWordDefinition() {
		if (this.word.definition) this.webSpeechService.readText(this.word.definition);
	}

	editWord() {
		this.modalService.toggleModal(EModalType.WordAdding, true);
		this.wordsFormService.setupForEditing(this.word);
		this.toggleDropdownMenu();
	}

	toggleIsLearning() {
		this.wordsService.toggleIsLearning(this.word.id);
	}

	toggleDropdownMenu() {
		this.isDropdownOpen = !this.isDropdownOpen;
	}

	toggleSelection() {
		this.wordsService.toggleSelection(this.word.id);
	}

	deleteWord() {
		this.wordsService.updateWordToDeleteId(this.word.id);
		this.toggleDropdownMenu();
		this.modalService.toggleModal(EModalType.WordDeletion, true);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
