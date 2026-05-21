import { Component, OnDestroy, OnInit } from "@angular/core";
import { ButtonComponent } from "@shared/components/button/button.component";
import { TranslateService } from "@ngx-translate/core";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { FoldersService } from "@services/folder/folders.service";
import { Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-folder-list-purger",
	imports: [ButtonComponent],
	templateUrl: "./folder-list-purger.component.html",
})
export class FolderListPurgerComponent implements OnInit, OnDestroy {
	hasSelectedFolders = false;
	private destroy$ = new Subject<void>();
	translations: Record<string, string> | null = null;

	constructor(
		private modalService: ModalService,
		private foldersService: FoldersService,
		private translateService: TranslateService,
	) {}

	ngOnInit() {
		this.foldersService.hasSelectedIds$
			.pipe(takeUntil(this.destroy$))
			.subscribe((hasSelectedIds) => {
				this.hasSelectedFolders = hasSelectedIds;
			});

		this.translateService
			.get(["folderlist.deleteSelected", "folderlist.deleteAll"])
			.pipe(takeUntil(this.destroy$))
			.subscribe((translations) => {
				this.translations = translations;
			});
	}

	openModal() {
		this.modalService.toggleModal(EModalType.FolderDeletion, true);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
