import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { WordsService } from "../../../services/words.service";
import { IWord } from "../../../types/word.interface";
import { WordListItemComponent } from "./word-list-item/word-list-item.component";
import { WordListOptionsComponent } from "./word-list-options/word-list-options.component";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-word-list",
	imports: [CommonModule, WordListItemComponent, WordListOptionsComponent],
	templateUrl: "./word-list.component.html",
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WordListComponent implements OnInit, OnDestroy {
	private subscriptions = new Subscription();
	sortedWordList: IWord[] = [];
	filteredWordList: IWord[] = [];

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		this.subscriptions.add(
			this.wordsService.sortedWordList$.subscribe((wordList) => {
				this.sortedWordList = wordList;
			})
		);

		this.subscriptions.add(
			this.wordsService.filteredWordList$.subscribe((wordList) => {
				this.filteredWordList = wordList;
			})
		);
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}
}
