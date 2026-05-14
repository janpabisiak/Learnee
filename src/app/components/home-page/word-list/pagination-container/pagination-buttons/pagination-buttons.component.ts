import { NgClass } from "@angular/common";
import { Component } from "@angular/core";
import { WordsService } from "@services/words/words.service";
import { combineLatest, Subscription } from "rxjs";

@Component({
	selector: "app-pagination-buttons",
	imports: [NgClass],
	templateUrl: "./pagination-buttons.component.html",
})
export class PaginationButtonsComponent {
	page = 0;
	maxPage = 0;
	pages: number[] = [];
	private subscription = new Subscription();

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		this.subscription = combineLatest([
			this.wordsService.page$,
			this.wordsService.maxPage$,
		]).subscribe(([page, maxPage]) => {
			this.page = page;
			this.maxPage = maxPage;
			this.pages = Array.from({ length: maxPage }, (_, i) => i).slice(
				page - 3 < 0 ? 0 : page - 3,
				page + 2,
			);
		});
	}

	setPage(page: number) {
		this.wordsService.setPage(page);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
