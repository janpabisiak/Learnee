import { NgIf } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit } from "@angular/core";
import { SectionTitleComponent } from "@components/utils/section-title/section-title.component";
import { TranslateService } from "@ngx-translate/core";
import { ModalService } from "@services/modal/modal.service";
import { combineLatest, Subscription } from "rxjs";
import { WordsService } from "../../services/words/words.service";
import { IWord } from "../../types/word.interface";
import { UserStatisticsComponent } from "./user-statistics/user-statistics.component";
import { WordListComponent } from "./word-list/word-list.component";
import { WordsOfTheDayComponent } from "./words-of-the-day/words-of-the-day.component";

@Component({
	selector: "app-home-page",
	standalone: true,
	templateUrl: "./home-page.component.html",
	imports: [
		WordListComponent,
		WordsOfTheDayComponent,
		UserStatisticsComponent,
		SectionTitleComponent,
		NgIf,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent implements OnInit, OnDestroy {
	private subscription = new Subscription();
	modalService = inject(ModalService);
	wordList: IWord[] = [];
	translations: Record<string, string> | null = null;

	constructor(private wordsService: WordsService, private translation: TranslateService) {}

	ngOnInit() {
		this.subscription = combineLatest([
			this.wordsService.wordList$,
			this.translation.get(["wordlist.title", "wordlist.count", "wordlist.addNew"]),
		]).subscribe(([wordList, translations]) => {
			this.wordList = wordList;

			this.translations = translations;

			if (this.translations && "wordlist.count" in this.translations) {
				this.translations["wordlist.count"] = this.translations["wordlist.count"].replace(
					"{{count}}",
					this.wordList.length.toString()
				);
			}
		});
	}

	toggleIsAddWordModalOpen(state: boolean) {
		this.modalService.toggleShowWordAddingModal(state);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
