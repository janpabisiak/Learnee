import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalComponent } from "@components/utils/modal/modal.component";
import { AddWordFormService } from "@services/add-edit-word-form.service";
import { ModalService } from "@services/modal.service";
import { Subscription } from "rxjs";

@Component({
	selector: "app-add-edit-word-modal",
	standalone: true,
	templateUrl: "./add-edit-word-modal.component.html",
	imports: [ModalComponent, ReactiveFormsModule, CommonModule],
})
export class AddEditWordModalComponent implements OnInit, OnDestroy {
	private subscriptions = new Subscription();
	isSubmitAttempted = false;
	isSubmitDisabled = false;

	constructor(
		private modalService: ModalService,
		private addEditWordFormService: AddWordFormService
	) {}

	ngOnInit() {
		this.subscriptions.add(
			this.addEditWordFormService.isSubmitAttempted$.subscribe((isAttempted) => {
				this.isSubmitAttempted = isAttempted;
			})
		);

		this.subscriptions.add(
			this.addEditWordFormService.isSubmitDisabled$.subscribe((isDisabled) => {
				this.isSubmitDisabled = isDisabled;
			})
		);
	}

	toggleIsAddWordModalOpen(state: boolean) {
		this.modalService.toggleShowWordAddingModal(state);
	}

	submitForm() {
		const isFormValid = this.addEditWordFormService.isFormValid();

		if (isFormValid) {
			this.addEditWordFormService.submitForm();
			this.modalService.toggleShowWordAddingModal(false);
		} else {
			this.form.markAllAsTouched();
		}
	}

	get isEditing() {
		return this.addEditWordFormService.getIsEditing();
	}

	get form() {
		return this.addEditWordFormService.form;
	}

	get word() {
		return this.addEditWordFormService.word;
	}

	get definition() {
		return this.addEditWordFormService.definition;
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
		this.addEditWordFormService.reset();
	}
}
