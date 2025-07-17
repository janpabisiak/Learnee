import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IWord } from "../../../types/word.interface";

@Component({
	selector: "app-word-list-item",
	templateUrl: "./word-list-item.component.html",
	styleUrls: ["./word-list-item.component.scss"],
	standalone: true,
})
export class WordListItemComponent {
	@Input({ required: true }) word?: IWord;
	@Output() wordDeleted = new EventEmitter<number>();
	@Output() wordEdited = new EventEmitter<number>();
	@Output() isLearningChanged = new EventEmitter<number>();

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
