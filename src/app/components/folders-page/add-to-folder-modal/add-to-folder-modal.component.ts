import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { FoldersService } from "@services/folder/folders.service";
import { ModalService } from "@services/modal/modal.service";
import { WordsOptionsService } from "@services/words-options/words-options.service";
import { WordsService } from "@services/words/words.service";
import { ModalComponent } from "@shared/components/modal/modal.component";
import { SearchBarComponent } from "@shared/components/search-bar/search-bar.component";
import { EModalType } from "@shared/constants/modal.constants";
import { Subject, take, takeUntil } from "rxjs";
import { IWord } from "../../../types/word.interface";

@Component({
	selector: "app-add-to-folder-modal",
	imports: [ModalComponent, TranslatePipe, SearchBarComponent],
	templateUrl: "./add-to-folder-modal.component.html",
})
export class AddToFolderModalComponent implements OnInit, OnDestroy {
	wordList: IWord[] = [];
	filteredWords: IWord[] = [];
	folderId: number | null = null;
	selectedWordIds: number[] = [];
	searchQuery = "";
	private destroy$ = new Subject<void>();

	constructor(
		private modalService: ModalService,
		private wordsService: WordsService,
		private foldersService: FoldersService,
		private wordsOptionsService: WordsOptionsService,
	) {}

	ngOnInit() {
		this.wordsService.wordList$.pipe(takeUntil(this.destroy$)).subscribe((wordList) => {
			this.wordList = wordList;
			this.updateFilteredWords();
		});

		this.foldersService.singleFolderIdToOperateOn$
			.pipe(take(1), takeUntil(this.destroy$))
			.subscribe((folderId) => {
				this.folderId = folderId;

				if (typeof this.folderId !== null) {
					this.initializeSelectedWordIds();
				}
			});
	}

	search(query: string) {
		this.searchQuery = query;
		this.updateFilteredWords();
	}

	initializeSelectedWordIds() {
		this.foldersService.folders$.pipe(take(1)).subscribe((folders) => {
			const folder = folders.find((folder) => folder.id === this.folderId);
			this.selectedWordIds = folder?.wordIds ?? [];
		});
	}

	isWordSelected(wordId: number) {
		return this.selectedWordIds.includes(wordId);
	}

	closeModal() {
		this.modalService.toggleModal(EModalType.AddToFolder, false);
	}

	toggleSelection(wordId: number) {
		const hasWordSelected = this.selectedWordIds.includes(wordId);

		if (hasWordSelected) {
			this.selectedWordIds = this.selectedWordIds.filter((id) => id !== wordId);
		} else {
			this.selectedWordIds = [...this.selectedWordIds, wordId];
		}
	}

	selectWordsForFolder() {
		this.foldersService.modifyFolderWordIds(this.selectedWordIds);
		this.closeModal();
	}

	private updateFilteredWords() {
		if (!this.searchQuery) {
			this.filteredWords = this.wordList;
			return;
		}

		this.filteredWords = this.wordsOptionsService.filter(this.wordList, this.searchQuery);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
