import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Subscription } from "rxjs";
import { WordsService } from "../../services/words.service";
import { IWord } from "../../types/word.interface";
import { WordListComponent } from "./word-list/word-list.component";

@Component({
	selector: "app-home-page",
	standalone: true,
	templateUrl: "./home-page.component.html",
	imports: [WordListComponent],
})
export class HomePageComponent {
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
