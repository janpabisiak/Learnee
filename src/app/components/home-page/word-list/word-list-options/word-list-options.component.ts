import { Component } from "@angular/core";
import { WordListPurgerComponent } from "./word-list-purger/word-list-purger.component";
import { WordListSearchBarComponent } from "./word-list-search-bar/word-list-search-bar.component";
import { WordListSelectionControlButtonComponent } from "./word-list-selection-control-button/word-list-selection-control-button.component";
import { WordListSortComponent } from "./word-list-sort/word-list-sort.component";

@Component({
	selector: "app-word-list-options",
	imports: [
		WordListSearchBarComponent,
		WordListSortComponent,
		WordListPurgerComponent,
		WordListSelectionControlButtonComponent,
	],
	templateUrl: "./word-list-options.component.html",
})
export class WordListOptionsComponent {}
