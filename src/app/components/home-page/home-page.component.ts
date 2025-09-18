import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { WordsService } from "../../services/words.service";
import { IWord } from "../../types/word.interface";
import { WordListComponent } from "./word-list/word-list.component";
import { ModalService } from "@services/modal.service";
import { ButtonComponent } from "@components/utils/button/button.component";
import { WordsOfTheDayComponent } from "./words-of-the-day/words-of-the-day.component";
import { UserStatisticsComponent } from "./user-statistics/user-statistics.component";

@Component({
	selector: "app-home-page",
	standalone: true,
	templateUrl: "./home-page.component.html",
	imports: [WordListComponent, ButtonComponent, WordsOfTheDayComponent, UserStatisticsComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent implements OnInit, OnDestroy {
	private subscription = new Subscription();
	modalService = inject(ModalService);
	wordList: IWord[] = [];

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		this.subscription = this.wordsService.wordList$.subscribe((wordList) => {
			this.wordList = wordList;
		});
	}

	toggleIsAddWordModalOpen(state: boolean) {
		this.modalService.toggleShowWordAddingModal(state);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
