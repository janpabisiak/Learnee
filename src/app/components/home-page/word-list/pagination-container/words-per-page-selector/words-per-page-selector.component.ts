import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { PaginationService } from "@services/pagination.service";
import { Subscription } from "rxjs";

@Component({
	selector: "app-words-per-page-selector",
	imports: [TranslatePipe],
	templateUrl: "./words-per-page-selector.component.html",
})
export class WordsPerPageSelectorComponent implements OnInit, OnDestroy {
	@ViewChild("select", { static: true }) selectEl!: ElementRef<HTMLSelectElement>;
	wordsPerPage = 0;
	private wordsPerPageSubscription = new Subscription();

	constructor(private paginationService: PaginationService) {}

	ngOnInit() {
		this.wordsPerPageSubscription = this.paginationService.wordsPerPage$.subscribe(
			(wordsPerPage) => {
				this.wordsPerPage = wordsPerPage;
			}
		);
	}

	setWordsPerPage() {
		const value = +this.selectEl.nativeElement.value;

		this.paginationService.setWordsPerPage(value);
	}

	ngOnDestroy() {
		this.wordsPerPageSubscription.unsubscribe();
	}
}
