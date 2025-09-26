import { NgIf } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { IResultRange, PaginationService } from "@services/pagination.service";
import { WordsService } from "@services/words.service";
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

	constructor(private paginationService: PaginationService, private wordsService: WordsService) {}

	ngOnInit() {
		this.subscription = combineLatest([
			this.paginationService.resultRange$,
			this.wordsService.filteredWordList$,
		]).subscribe(([resultRange, filteredWordList]) => {
			this.resultRange = resultRange;
			this.numberOfWords = filteredWordList.length;
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
