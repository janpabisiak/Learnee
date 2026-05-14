import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { WordsService } from "@services/words/words.service";
import { Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-words-per-page-selector",
	imports: [TranslatePipe],
	templateUrl: "./words-per-page-selector.component.html",
})
export class WordsPerPageSelectorComponent implements OnInit, OnDestroy {
	wordsPerPage = 0;
	wordsPerPageOptions = [10, 20, 30, 50];
	private destroy$ = new Subject<void>();

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		this.wordsService.wordsPerPage$
			.pipe(takeUntil(this.destroy$))
			.subscribe((wordsPerPage) => {
				this.wordsPerPage = wordsPerPage;
			});
	}

	setWordsPerPage(value: number) {
		this.wordsService.setWordsPerPage(value);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
