import { Component, HostListener } from "@angular/core";
import { ESortTypes, WordsService } from "@services/words.service";

@Component({
	selector: "app-word-list-sort",
	imports: [],
	templateUrl: "./word-list-sort.component.html",
})
export class WordListSortComponent {
	@HostListener("change", ["$event.target"])
	sortWordList(hostEl: HTMLSelectElement) {
		this.wordsService.sortWordList(hostEl.value as ESortTypes);
	}

	constructor(private wordsService: WordsService) {}
}
