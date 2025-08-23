import { Component } from "@angular/core";
import { WordListSearchBarComponent } from "./word-list-search-bar/word-list-search-bar.component";
import { WordListSortComponent } from "./word-list-sort/word-list-sort.component";
import { WordListPurgerComponent } from "./word-list-purger/word-list-purger.component";

@Component({
	selector: "app-word-list-options",
	imports: [WordListSearchBarComponent, WordListSortComponent, WordListPurgerComponent],
	templateUrl: "./word-list-options.component.html",
})
export class WordListOptionsComponent {}
