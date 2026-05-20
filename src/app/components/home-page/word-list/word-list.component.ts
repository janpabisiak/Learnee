import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { combineLatest, Subject, takeUntil } from "rxjs";
import { WordsService } from "../../../services/words/words.service";
import { IWord } from "../../../types/word.interface";
import { WordListItemComponent } from "./word-list-item/word-list-item.component";
import { WordListOptionsComponent } from "./word-list-options/word-list-options.component";
import { WordPaginationContainerComponent } from "./word-pagination-container/word-pagination-container.component";

@Component({
	selector: "app-word-list",
	imports: [
		CommonModule,
		WordListItemComponent,
		WordListOptionsComponent,
		WordPaginationContainerComponent,
		TranslatePipe,
	],
	templateUrl: "./word-list.component.html",
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WordListComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();
	hasWords = false;
	wordList: IWord[] = [];
	isWordListLoaded = false;

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		combineLatest([this.wordsService.wordList$, this.wordsService.visibleWords$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([wordList, visibleWords]) => {
				this.hasWords = wordList.length > 0;
				this.wordList = visibleWords;
				this.isWordListLoaded = true;
			});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
