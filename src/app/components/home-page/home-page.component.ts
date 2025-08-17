import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { WordsService } from "../../services/words.service";
import { IWord } from "../../types/word.interface";
import { WordListComponent } from "./word-list/word-list.component";
import { ModalService } from "@services/modal.service";
import { ButtonComponent } from "@components/utils/button/button.component";

@Component({
	selector: "app-home-page",
	standalone: true,
	templateUrl: "./home-page.component.html",
	imports: [WordListComponent, ButtonComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent implements OnInit, OnDestroy {
	subscriptions = new Subscription();
	modalService = inject(ModalService);
	wordList: IWord[] = [];

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		this.subscriptions.add(
			this.wordsService.wordList$.subscribe((wordList) => {
				this.wordList = wordList;
			})
		);
	}

	toggleIsAddWordModalOpen(state: boolean) {
		this.modalService.toggleShowWordAddingModal(state);
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}
}
