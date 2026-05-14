import { NgIf } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { IResultRange } from "@services/words-options/words-options.service";
import { WordsService } from "@services/words/words.service";
import { combineLatest, Subscription } from "rxjs";

@Component({
	selector: "app-results-indicator",
	imports: [NgIf, TranslatePipe],
	templateUrl: "./results-indicator.component.html",
})
export class ResultsIndicatorComponent implements OnInit, OnDestroy {
	resultRange: IResultRange | null = null;
	numberOfWords = 0;
	private subscription = new Subscription();

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		this.subscription = combineLatest([
			this.wordsService.resultRange$,
			this.wordsService.numberOfFilteredWords$,
		]).subscribe(([resultRange, numberOfFilteredWords]) => {
			this.resultRange = resultRange;
			this.numberOfWords = numberOfFilteredWords;
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
