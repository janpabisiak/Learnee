import { Component, OnDestroy, OnInit } from "@angular/core";
import { ButtonComponent } from "@shared/components/button/button.component";
import { TranslatePipe } from "@ngx-translate/core";
import { WordsService } from "@services/words/words.service";
import { Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-word-list-selection-control-buttons",
	imports: [ButtonComponent, TranslatePipe],
	templateUrl: "./word-list-selection-control-buttons.component.html",
})
export class WordListSelectionControlButtonsComponent implements OnInit, OnDestroy {
	hasSelectedWords = false;
	isDropdownOpen = false;
	private destroy$ = new Subject<void>();

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		this.wordsService.hasSelectedIds$
			.pipe(takeUntil(this.destroy$))
			.subscribe((hasSelectedIds) => {
				this.hasSelectedWords = hasSelectedIds;
			});
	}

	selectAllVisible() {
		this.wordsService.selectAllVisible();
	}

	unselectAll() {
		this.wordsService.unselectAll();
	}

	toggleDropdown() {
		this.isDropdownOpen = !this.isDropdownOpen;
	}

	setIsLearningForSelected(isLearning: boolean) {
		this.wordsService.setIsLearningForSelected(isLearning);
		this.toggleDropdown();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
