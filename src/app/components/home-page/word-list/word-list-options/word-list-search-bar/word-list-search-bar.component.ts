import { NgIf } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { WordsService } from "@services/words/words.service";
import { take } from "rxjs";

@Component({
	selector: "app-word-list-search-bar",
	imports: [NgIf],
	templateUrl: "./word-list-search-bar.component.html",
})
export class WordListSearchBarComponent implements OnInit {
	translationValue: string | null = null;

	@HostListener("input", ["$event.target"])
	search(hostEl: HTMLInputElement) {
		this.wordsService.setSearchQuery(hostEl.value);
	}

	constructor(
		private wordsService: WordsService,
		private translation: TranslateService,
	) {}

	ngOnInit() {
		this.translation
			.get("wordlist.searchPlaceholder")
			.pipe(take(1))
			.subscribe((translation) => {
				this.translationValue = translation;
			});
	}
}
