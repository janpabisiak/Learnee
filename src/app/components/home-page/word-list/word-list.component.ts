import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { combineLatest, Subject, takeUntil } from "rxjs";
import { WordsService } from "../../../services/words/words.service";
import { IWord } from "../../../types/word.interface";
import { PaginationContainerComponent } from "./pagination-container/pagination-container.component";
import { WordListItemComponent } from "./word-list-item/word-list-item.component";
import { WordListOptionsComponent } from "./word-list-options/word-list-options.component";

@Component({
	selector: "app-word-list",
	imports: [
		CommonModule,
		WordListItemComponent,
		WordListOptionsComponent,
		PaginationContainerComponent,
		TranslatePipe,
	],
	templateUrl: "./word-list.component.html",
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WordListComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();
	sortedWordList: IWord[] = [];
	paginatedWordList: IWord[] = [];
	isWordListLoaded = false;

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		combineLatest([this.wordsService.sortedWordList$, this.wordsService.paginatedWordList$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([sortedWordList, paginatedWordList]) => {
				this.sortedWordList = sortedWordList;
				this.paginatedWordList = paginatedWordList;

				this.isWordListLoaded = true;
			});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
