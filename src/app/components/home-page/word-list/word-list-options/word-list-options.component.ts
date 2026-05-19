import { Component } from "@angular/core";
import { WordListPurgerComponent } from "./word-list-purger/word-list-purger.component";
import { WordListSearchBarComponent } from "./word-list-search-bar/word-list-search-bar.component";
import { WordListSelectionControlButtonsComponent } from "./word-list-selection-control-buttons/word-list-selection-control-buttons.component";
import { WordListSortComponent } from "./word-list-sort/word-list-sort.component";

@Component({
	selector: "app-word-list-options",
	imports: [
		WordListSearchBarComponent,
		WordListSortComponent,
		WordListPurgerComponent,
		WordListSelectionControlButtonsComponent,
	],
	templateUrl: "./word-list-options.component.html",
})
export class WordListOptionsComponent {}
