import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit } from "@angular/core";
import { SectionTitleComponent } from "@shared/components/section-title/section-title.component";
import { TranslatePipe } from "@ngx-translate/core";
import { ModalService } from "@services/modal/modal.service";
import { EModalType } from "@shared/constants/modal.constants";
import { Subscription } from "rxjs";
import { WordsService } from "../../services/words/words.service";
import { UserStatisticsComponent } from "./user-statistics/user-statistics.component";
import { WordListComponent } from "./word-list/word-list.component";
import { WordsOfTheDayComponent } from "./words-of-the-day/words-of-the-day.component";
import { TagComponent } from "@shared/components/tag/tag.component";

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
		TagComponent,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent implements OnInit, OnDestroy {
	private subscription = new Subscription();
	private modalService = inject(ModalService);
	numOfWords = 0;
	numOfLearningWords = 0;

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		this.subscription = this.wordsService.numberOfWords$.subscribe((numberOfWords) => {
			this.numOfWords = numberOfWords;
		});

		this.subscription = this.wordsService.numberOfLearningWords$.subscribe(
			(numberOfLearningWords) => {
				this.numOfLearningWords = numberOfLearningWords;
			},
		);
	}

	toggleIsAddWordModalOpen(state: boolean) {
		this.modalService.toggleModal(EModalType.WordAdding, state);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
