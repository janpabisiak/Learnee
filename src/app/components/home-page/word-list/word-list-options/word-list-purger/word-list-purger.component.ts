import { Component, OnDestroy, OnInit } from "@angular/core";
import { ButtonComponent } from "@components/utils/button/button.component";
import { TranslateService } from "@ngx-translate/core";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { WordsService } from "@services/words/words.service";
import { Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-word-list-purger",
	imports: [ButtonComponent],
	templateUrl: "./word-list-purger.component.html",
})
export class WordListPurgerComponent implements OnInit, OnDestroy {
	hasSelectedWords = false;
	private destroy$ = new Subject<void>();
	translations: Record<string, string> | null = null;

	constructor(
		private modalService: ModalService,
		private wordsService: WordsService,
		private translateService: TranslateService,
	) {}

	ngOnInit() {
		this.wordsService.hasSelectedIds$
			.pipe(takeUntil(this.destroy$))
			.subscribe((hasSelectedIds) => {
				this.hasSelectedWords = hasSelectedIds;
			});

		this.translateService
			.get(["wordlist.deleteSelected", "wordlist.deleteAll"])
			.pipe(takeUntil(this.destroy$))
			.subscribe((translations) => {
				this.translations = translations;
			});
	}

	openModal() {
		this.modalService.toggleModal(EModalType.WordDeletion, true);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
