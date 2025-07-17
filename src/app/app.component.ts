import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AddWordFormComponent } from "./components/add-word-form/add-word-form.component";
import { WordListComponent } from "./components/word-list/word-list.component";
import { WordsService } from "./services/words.service";
import { IWord } from "./types/word.interface";

@Component({
	selector: "app-root",
	imports: [AddWordFormComponent, WordListComponent],
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	standalone: true,
})
export class AppComponent implements OnInit, OnDestroy {
	wordListSubscription = new Subscription();
	wordList: IWord[] = [];

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		this.wordListSubscription = this.wordsService.wordList$.subscribe(
			(wordList) => {
				this.wordList = wordList;
			}
		);
	}

	ngOnDestroy() {
		this.wordListSubscription.unsubscribe();
	}
}
