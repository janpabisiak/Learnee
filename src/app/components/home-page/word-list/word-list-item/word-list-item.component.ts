import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from "@angular/core";
import { SentenceCasePipe } from "../../../../pipes/sentence-case.pipe";
import { IWord } from "../../../../types/word.interface";
import { WebSpeechService } from "../../../../services/web-speech.service";

@Component({
	selector: "app-word-list-item",
	templateUrl: "./word-list-item.component.html",
	imports: [SentenceCasePipe],
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WordListItemComponent {
	@Input({ required: true }) word?: IWord;
	@Output() wordDeleted = new EventEmitter<number>();
	@Output() wordEdited = new EventEmitter<number>();
	@Output() isLearningChanged = new EventEmitter<number>();
	isDropdownOpen = false;

	constructor(private webSpeechService: WebSpeechService) {}

	readWord() {
		if (this.word?.name) this.webSpeechService.readText(this.word.name);
	}

	readWordDefinition() {
		if (this.word?.definition) this.webSpeechService.readText(this.word.definition);
	}

	editWord() {
		this.wordEdited.emit(this.word?.id);
	}

	toggleLearning() {
		this.isLearningChanged.emit(this.word?.id);
	}

	toggleDropdownMenu() {
		this.isDropdownOpen = !this.isDropdownOpen;
	}

	deleteWord() {
		this.wordDeleted.emit(this.word?.id);
	}
}
