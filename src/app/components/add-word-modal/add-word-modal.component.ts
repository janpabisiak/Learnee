import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalComponent } from "@components/utils/modal/modal.component";
import { AddWordFormService } from "@services/add-word-form.service";
import { ModalService } from "@services/modal.service";
import { Subscription } from "rxjs";

@Component({
	selector: "app-add-word-modal",
	standalone: true,
	templateUrl: "./add-word-modal.component.html",
	imports: [ModalComponent, ReactiveFormsModule, CommonModule],
	providers: [AddWordFormService],
})
export class AddWordModalComponent implements OnInit, OnDestroy {
	private subscriptions = new Subscription();
	isSubmitAttempted = false;
	isSubmitDisabled = false;

	constructor(
		private modalService: ModalService,
		private addWordFormService: AddWordFormService
	) {}

	ngOnInit() {
		this.subscriptions.add(
			this.addWordFormService.isSubmitAttempted$.subscribe((isAttempted) => {
				console.log(`isAttempted: ${isAttempted}`);
				this.isSubmitAttempted = isAttempted;
			})
		);

		this.subscriptions.add(
			this.addWordFormService.isSubmitDisabled$.subscribe((isDisabled) => {
				console.log(`isDisabled: ${isDisabled}`);
				this.isSubmitDisabled = isDisabled;
			})
		);
	}

	toggleIsAddWordModalOpen(state: boolean) {
		this.modalService.toggleIsWordAddingModalOpen(state);
	}

	submitForm() {
		const isFormValid = this.addWordFormService.isFormValid();

		if (isFormValid) {
			this.addWordFormService.submitForm();
			this.modalService.toggleIsWordAddingModalOpen(false);
		} else {
			this.form.markAllAsTouched();
		}
	}

	get form() {
		return this.addWordFormService.form;
	}

	get word() {
		return this.addWordFormService.word;
	}

	get definition() {
		return this.addWordFormService.definition;
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
		this.addWordFormService.destroy();
	}
}
