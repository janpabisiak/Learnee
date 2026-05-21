import { NgClass } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
	selector: "app-pagination-buttons",
	imports: [NgClass],
	templateUrl: "./pagination-buttons.component.html",
})
export class PaginationButtonsComponent implements OnInit {
	@Input({ required: true }) page!: number;
	@Input({ required: true }) pages: number[] | null = null;
	@Output() changed = new EventEmitter<number>();
	maxPage = 0;

	ngOnInit() {
		if (!Array.isArray(this.pages)) {
			return;
		}

		const pagesLength = this.pages.length;
		this.maxPage = this.pages[pagesLength - 1];
	}

	changePage(value: number) {
		this.changed.emit(value);
	}
}
