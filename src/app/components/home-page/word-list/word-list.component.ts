import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { WordsService } from "../../../services/words.service";
import { IWord } from "../../../types/word.interface";
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

	ngOnDestroy() {
		this.wordListSubscription.unsubscribe();
	}
}
