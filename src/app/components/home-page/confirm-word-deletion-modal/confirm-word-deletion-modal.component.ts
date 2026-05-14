import { Component, OnInit } from "@angular/core";
import { ModalComponent } from "@components/utils/modal/modal.component";
import { TranslatePipe } from "@ngx-translate/core";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { WordsService } from "@services/words/words.service";
import { combineLatest, Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-confirm-word-deletion-modal",
	imports: [ModalComponent, TranslatePipe],
	templateUrl: "./confirm-word-deletion-modal.component.html",
})
export class ConfirmWordDeletionModalComponent implements OnInit {
	wordId: number | null = null;
	hasSelectedWords = false;
	private destroy$ = new Subject<void>();

	constructor(
		private modalService: ModalService,
		private wordsService: WordsService,
	) {}

	ngOnInit() {
		combineLatest([this.wordsService.hasSelectedIds$, this.wordsService.wordToDeleteId$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([hasSelectedIds, wordToDeleteId]) => {
				this.hasSelectedWords = hasSelectedIds;
				this.wordId = wordToDeleteId;
			});
	}

	closeModal() {
		this.modalService.toggleModal(EModalType.WordDeletion, false);
	}

	confirmDeletion() {
		if (this.wordId) {
			this.wordsService.removeWord(this.wordId);
		} else {
			this.wordsService.removeManyWords();
		}

		this.closeModal();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
