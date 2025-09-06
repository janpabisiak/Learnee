import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ESortTypes, WordsService } from "@services/words.service";
import { Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-word-list-sort",
	imports: [],
	templateUrl: "./word-list-sort.component.html",
})
export class WordListSortComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();
	hasNotLearningWords = false;

	@HostListener("change", ["$event.target"])
	sortWordList(hostEl: HTMLSelectElement) {
		this.wordsService.sortWordList(hostEl.value as ESortTypes);
	}

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		this.wordsService.filteredWordList$.pipe(takeUntil(this.destroy$)).subscribe((wordList) => {
			this.hasNotLearningWords = wordList.some((w) => !w.isLearning);
		});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
