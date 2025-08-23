import { Component, HostListener } from "@angular/core";
import { WordsService } from "@services/words.service";

@Component({
	selector: "app-word-list-search-bar",
	imports: [],
	templateUrl: "./word-list-search-bar.component.html",
})
export class WordListSearchBarComponent {
	@HostListener("input", ["$event.target"])
	search(hostEl: HTMLInputElement) {
		this.wordsService.filterWordList(hostEl.value);
	}

	constructor(private wordsService: WordsService) {}
}
