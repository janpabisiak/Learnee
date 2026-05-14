import { Component, OnDestroy, OnInit } from "@angular/core";
import { ButtonComponent } from "@components/utils/button/button.component";
import { TranslatePipe } from "@ngx-translate/core";
import { WordsService } from "@services/words/words.service";
import { Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-word-list-selection-control-button",
	imports: [ButtonComponent, TranslatePipe],
	templateUrl: "./word-list-selection-control-button.component.html",
})
export class WordListSelectionControlButtonComponent implements OnInit, OnDestroy {
	hasSelectedWords = false;
	private destroy$ = new Subject<void>();

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		this.wordsService.hasSelectedIds$
			.pipe(takeUntil(this.destroy$))
			.subscribe((hasSelectedIds) => {
				this.hasSelectedWords = hasSelectedIds;
			});
	}

	unselectAll() {
		this.wordsService.unselectAll();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
