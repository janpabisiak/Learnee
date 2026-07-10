import { CommonModule } from "@angular/common";
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslatePipe } from "@ngx-translate/core";
import { FoldersFormService } from "@services/folders-form/folders-form.service";
import { ModalService } from "@services/modal/modal.service";
import { ModalComponent } from "@shared/components/modal/modal.component";
import { EModalType } from "@shared/constants/modal.constants";
import {
	FOLDER_DESCRIPTION_MAX_LENGTH,
	FOLDER_NAME_MAX_LENGTH,
} from "@shared/constants/validation.constants";
import { Subscription } from "rxjs";

@Component({
	selector: "app-add-edit-folder-modal",
	standalone: true,
	templateUrl: "./add-edit-folder-modal.component.html",
	imports: [ModalComponent, ReactiveFormsModule, CommonModule, TranslatePipe],
})
export class AddEditFolderModalComponent implements OnInit, OnDestroy {
	@ViewChild("folderDescription") folderDescriptionEl!: ElementRef<HTMLTextAreaElement>;

	private subscriptions = new Subscription();
	isSubmitAttempted = false;
	isSubmitDisabled = false;
	translations: Record<string, string> | null = null;
	folderNameMaxLength = FOLDER_NAME_MAX_LENGTH;
	folderDescriptionMaxLength = FOLDER_DESCRIPTION_MAX_LENGTH;

	constructor(
		private modalService: ModalService,
		private foldersFormService: FoldersFormService,
		private renderer: Renderer2,
	) {}

	ngOnInit() {
		this.subscriptions.add(
			this.foldersFormService.isSubmitAttempted$.subscribe((isAttempted) => {
				this.isSubmitAttempted = isAttempted;
			}),
		);

		this.subscriptions.add(
			this.foldersFormService.isSubmitDisabled$.subscribe((isDisabled) => {
				this.isSubmitDisabled = isDisabled;
			}),
		);

		this.subscriptions.add(
			this.description.valueChanges.subscribe(() => {
				if (this.folderDescriptionEl) {
					this.renderer.setStyle(
						this.folderDescriptionEl.nativeElement,
						"height",
						"auto",
					);
					this.renderer.setStyle(
						this.folderDescriptionEl.nativeElement,
						"height",
						`${this.folderDescriptionEl.nativeElement.scrollHeight}px`,
					);
				}
			}),
		);
	}

	toggleIsAddFolderModalOpen(state: boolean) {
		this.modalService.toggleModal(EModalType.FolderAdding, state);
	}

	submitForm() {
		const isFormValid = this.foldersFormService.isFormValid();

		if (isFormValid) {
			this.foldersFormService.submitForm();
			this.modalService.toggleModal(EModalType.FolderAdding, false);
		} else {
			this.form.markAllAsTouched();
		}
	}

	get isEditing() {
		return this.foldersFormService.getIsEditing();
	}

	get form() {
		return this.foldersFormService.form;
	}

	get name() {
		return this.foldersFormService.name;
	}

	get description() {
		return this.foldersFormService.description;
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
		this.foldersFormService.reset();
	}
}
