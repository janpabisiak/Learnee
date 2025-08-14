import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from "@angular/core";
import { WordsService } from "../../../services/words.service";
import { IWord } from "../../../types/word.interface";
import { Subscription } from "rxjs";
import { WordListItemComponent } from "./word-list-item/word-list-item.component";

@Component({
	selector: "app-word-list",
	imports: [WordListItemComponent],
	templateUrl: "./word-list.component.html",
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WordListComponent implements OnInit, OnDestroy {
	wordListSubscription = new Subscription();
	wordList: IWord[] = [];

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		this.wordListSubscription = this.wordsService.wordList$.subscribe((wordList) => {
			this.wordList = wordList;
		});
	}

	// TODO: handle word definition edit business logic
	editWord(id: number) {
		this.wordsService.editWordDefinition(id, "[new_value]");
	}

	toggleIsLearning(id: number) {
		this.wordsService.toggleIsLearning(id);
	}

	deleteWord(id: number) {
		this.wordsService.removeWord(id);
	}

	ngOnDestroy() {
		this.wordListSubscription.unsubscribe();
	}
}
