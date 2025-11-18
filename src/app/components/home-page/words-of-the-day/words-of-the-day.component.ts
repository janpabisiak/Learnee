import { Component, OnDestroy, OnInit } from "@angular/core";
import { WordsService } from "@services/words/words.service";
import { IWord } from "../../../types/word.interface";
import { Subject, takeUntil } from "rxjs";
import { ButtonComponent } from "@components/utils/button/button.component";
import { WotdItemComponent } from "./wotd-item/wotd-item.component";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { AddWordFormService } from "@services/add-edit-word-form/add-edit-word-form.service";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
	selector: "app-words-of-the-day",
	imports: [ButtonComponent, WotdItemComponent, WotdItemComponent, TranslatePipe],
	templateUrl: "./words-of-the-day.component.html",
})
export class WordsOfTheDayComponent implements OnInit, OnDestroy {
	currentWordId = 0;
	wordsOfTheDay: IWord[] = [];
	private destroy$ = new Subject<void>();

	constructor(
		private wordsService: WordsService,
		private modalService: ModalService,
		private addWordFormService: AddWordFormService
	) {}

	ngOnInit() {
		this.wordsService.wordsOfTheDay$
			.pipe(takeUntil(this.destroy$))
			.subscribe((wordsOfTheDay) => {
				this.wordsOfTheDay = wordsOfTheDay;
			});
	}

	nextWord() {
		if (this.currentWordId !== this.wordsOfTheDay.length - 1) {
			this.currentWordId = this.currentWordId + 1;
		} else {
			this.currentWordId = 0;
		}
	}

	addWord() {
		this.modalService.toggleModal(EModalType.WordAdding, true);
		this.addWordFormService.setupForEditing({
			...this.wordsOfTheDay[this.currentWordId],
			id: 0,
			toBeAdded: true,
		});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
