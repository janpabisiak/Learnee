import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from "@angular/core";
import { combineLatest, Subject, takeUntil } from "rxjs";
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
	private destroy$ = new Subject<void>();
	sortedWordList: IWord[] = [];
	filteredWordList: IWord[] = [];
	isWordListLoaded = false;

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		combineLatest([this.wordsService.sortedWordList$, this.wordsService.filteredWordList$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([sortedWordList, filteredWordList]) => {
				this.sortedWordList = sortedWordList;
				this.filteredWordList = filteredWordList;

				this.isWordListLoaded = true;
			});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
