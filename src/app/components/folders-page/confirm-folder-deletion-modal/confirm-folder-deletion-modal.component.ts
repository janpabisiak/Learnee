import { Component, OnInit } from "@angular/core";
import { ModalComponent } from "@shared/components/modal/modal.component";
import { TranslatePipe } from "@ngx-translate/core";
import { ModalService } from "@services/modal/modal.service";
import { EModalType } from "@shared/constants/modal.constants";
import { FoldersService } from "@services/folder/folders.service";
import { combineLatest, Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-confirm-folder-deletion-modal",
	imports: [ModalComponent, TranslatePipe],
	templateUrl: "./confirm-folder-deletion-modal.component.html",
	standalone: true,
})
export class ConfirmFolderDeletionModalComponent implements OnInit {
	folderId: number | null = null;
	hasSelectedFolders = false;
	private destroy$ = new Subject<void>();

	constructor(
		private modalService: ModalService,
		private foldersService: FoldersService,
	) {}

	ngOnInit() {
		combineLatest([
			this.foldersService.hasSelectedIds$,
			this.foldersService.singleFolderIdToOperateOn$,
		])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([hasSelectedIds, folderToDeleteId]) => {
				this.hasSelectedFolders = hasSelectedIds;
				this.folderId = folderToDeleteId;
			});
	}

	closeModal() {
		this.modalService.toggleModal(EModalType.FolderDeletion, false);
		this.foldersService.updateSingleFolderIdToOperateOn(null);
	}

	confirmDeletion() {
		if (this.folderId !== null) {
			this.foldersService.delete(this.folderId);
		} else {
			this.foldersService.deleteMany();
		}

		this.closeModal();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
