import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit } from "@angular/core";
import { SectionTitleComponent } from "@components/utils/section-title/section-title.component";
import { TranslatePipe } from "@ngx-translate/core";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { Subscription } from "rxjs";
import { WordsService } from "../../services/words/words.service";
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
		TranslatePipe,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent implements OnInit, OnDestroy {
	private subscription = new Subscription();
	modalService = inject(ModalService);
	numOfWords = 0;
	translations: Record<string, string> | null = null;

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		this.subscription = this.wordsService.wordList$.subscribe((wordList) => {
			this.numOfWords = wordList.length;
		});
	}

	toggleIsAddWordModalOpen(state: boolean) {
		this.modalService.toggleModal(EModalType.WordAdding, state);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
