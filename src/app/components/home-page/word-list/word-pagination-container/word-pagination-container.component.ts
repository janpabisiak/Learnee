import { Component, OnDestroy, OnInit } from "@angular/core";
import { WordsService } from "@services/words/words.service";
import { ItemsPerPageSelectorComponent } from "@shared/items-per-page-selector/items-per-page-selector.component";
import { PaginationButtonsComponent } from "@shared/pagination-buttons/pagination-buttons.component";
import { ResultsCounterComponent } from "@shared/results-counter/results-counter.component";
import { IResultRange } from "../../../../types/resultRange.interface";
import { combineLatest, Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-word-pagination-container",
	imports: [PaginationButtonsComponent, ResultsCounterComponent, ItemsPerPageSelectorComponent],
	templateUrl: "./word-pagination-container.component.html",
})
export class WordPaginationContainerComponent implements OnInit, OnDestroy {
	resultRange: IResultRange | null = null;
	numberOfWords = 0;
	page = 0;
	maxPage = 0;
	pages: number[] = [];
	wordsPerPage = 0;
	wordsPerPageOptions = [10, 20, 30, 50];
	private destroy$ = new Subject<void>();

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		combineLatest([
			this.wordsService.resultRange$,
			this.wordsService.numberOfFilteredWords$,
			this.wordsService.page$,
			this.wordsService.maxPage$,
			this.wordsService.wordsPerPage$,
		])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([resultRange, numberOfFilteredWords, page, maxPage, wordsPerPage]) => {
				this.resultRange = resultRange;
				this.numberOfWords = numberOfFilteredWords;
				this.page = page;
				this.maxPage = maxPage;
				this.pages = Array.from({ length: maxPage }, (_, i) => i).slice(
					page - 3 < 0 ? 0 : page - 3,
					page + 2,
				);
				this.wordsPerPage = wordsPerPage;
			});
	}

	setPage(page: number) {
		this.wordsService.setPage(page);
	}

	setWordsPerPage(value: number) {
		this.wordsService.setWordsPerPage(value);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
