import { Component } from "@angular/core";
import { WordListComponent } from "./word-list/word-list.component";
import { AddWordFormComponent } from "./add-word-form/add-word-form.component";
import { IWord } from "../../types/word.interface";
import { Subscription } from "rxjs";
import { WordsService } from "../../services/words.service";

@Component({
	selector: "app-home-page",
	standalone: true,
	templateUrl: "./home-page.component.html",
	styleUrls: ["./home-page.component.scss"],
	imports: [WordListComponent, AddWordFormComponent],
})
export class HomePageComponent {
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
