import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SentenceCasePipe } from "../../../pipes/sentence-case.pipe";
import { IWord } from "../../../types/word.interface";
import { WebSpeechService } from "../../../services/web-speech.service";

@Component({
	selector: "app-word-list-item",
	templateUrl: "./word-list-item.component.html",
	styleUrls: ["./word-list-item.component.scss"],
	imports: [SentenceCasePipe],
	standalone: true,
})
export class WordListItemComponent {
	@Input({ required: true }) word?: IWord;
	@Output() wordDeleted = new EventEmitter<number>();
	@Output() wordEdited = new EventEmitter<number>();
	@Output() isLearningChanged = new EventEmitter<number>();

	constructor(private webSpeechService: WebSpeechService) {}

	readWord() {
		if (this.word?.name) this.webSpeechService.readText(this.word.name);
	}

	readWordDefinition() {
		if (this.word?.definition)
			this.webSpeechService.readText(this.word.definition);
	}

	editWord() {
		this.wordEdited.emit(this.word?.id);
	}

	toggleLearning() {
		this.isLearningChanged.emit(this.word?.id);
	}

	deleteWord() {
		this.wordDeleted.emit(this.word?.id);
	}
}
