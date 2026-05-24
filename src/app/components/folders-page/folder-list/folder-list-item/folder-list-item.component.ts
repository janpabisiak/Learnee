import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnDestroy, OnInit } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { FoldersService } from "@services/folder/folders.service";
import { FoldersFormService } from "@services/folders-form/folders-form.service";
import { ModalService } from "@services/modal/modal.service";
import { EModalType } from "@shared/constants/modal.constants";
import { Subject, takeUntil } from "rxjs";
import { SentenceCasePipe } from "../../../../pipes/sentence-case.pipe";
import { IFolder } from "../../../../types/folder.interface";
import { AutoCloseDirective } from "app/directives/auto-close.directive";

@Component({
	selector: "app-folder-list-item",
	imports: [SentenceCasePipe, TranslatePipe, AutoCloseDirective],
	templateUrl: "./folder-list-item.component.html",
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FolderListItemComponent implements OnInit, OnDestroy {
	@Input({ required: true }) folder!: IFolder;
	isFolderSelected = false;
	isDropdownOpen = false;
	private destroy$ = new Subject<void>();

	constructor(
		private foldersFormService: FoldersFormService,
		private foldersService: FoldersService,
		private modalService: ModalService,
	) {}

	ngOnInit() {
		this.foldersService.selectedIds$.pipe(takeUntil(this.destroy$)).subscribe((selectedIds) => {
			this.isFolderSelected = selectedIds.includes(this.folder.id);
		});
	}

	editFolder() {
		this.modalService.toggleModal(EModalType.FolderAdding, true);
		this.foldersFormService.setupForEditing(this.folder);
		this.toggleDropdownMenu();
	}

	toggleDropdownMenu() {
		this.isDropdownOpen = !this.isDropdownOpen;
	}

	toggleSelection() {
		this.foldersService.toggleSelection(this.folder.id);
	}

	deleteFolder() {
		this.foldersService.updateSingleFolderIdToOperateOn(this.folder.id);
		this.toggleDropdownMenu();
		this.modalService.toggleModal(EModalType.FolderDeletion, true);
	}

	modifyWordList() {
		this.foldersService.updateSingleFolderIdToOperateOn(this.folder.id);
		this.toggleDropdownMenu();
		this.modalService.toggleModal(EModalType.AddToFolder, true);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
