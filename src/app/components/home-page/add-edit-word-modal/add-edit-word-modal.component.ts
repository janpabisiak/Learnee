import { CommonModule } from "@angular/common";
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalComponent } from "@components/utils/modal/modal.component";
import { AddWordFormService } from "@services/add-edit-word-form.service";
import { ModalService } from "@services/modal.service";
import { WordsService } from "@services/words.service";
import { Subscription, take } from "rxjs";

@Component({
	selector: "app-add-edit-word-modal",
	standalone: true,
	templateUrl: "./add-edit-word-modal.component.html",
	imports: [ModalComponent, ReactiveFormsModule, CommonModule],
})
export class AddEditWordModalComponent implements OnInit, OnDestroy {
	@ViewChild("wordDefinition") wordDefinitionEl!: ElementRef<HTMLTextAreaElement>;

	private subscriptions = new Subscription();
	isSubmitAttempted = false;
	isSubmitDisabled = false;
	isDefinitionFetched = false;

	constructor(
		private modalService: ModalService,
		private addEditWordFormService: AddWordFormService,
		private wordsService: WordsService,
		private renderer: Renderer2
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

		this.subscriptions.add(
			this.word.valueChanges.subscribe(() => (this.isDefinitionFetched = false))
		);

		this.subscriptions.add(
			this.definition.valueChanges.subscribe(() => {
				this.renderer.setStyle(this.wordDefinitionEl.nativeElement, "height", "auto");
				this.renderer.setStyle(
					this.wordDefinitionEl.nativeElement,
					"height",
					`${this.wordDefinitionEl.nativeElement.scrollHeight}px`
				);
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

	fetchWordDefinition() {
		if (this.isDefinitionFetched || !this.word.value || this.definition.value) return;

		this.wordDefinitionEl.nativeElement.placeholder = "Auto fetching definition...";
		this.wordDefinitionEl.nativeElement.disabled = true;
		this.wordsService
			.fetchWordDefinition$(this.word.value)
			.pipe(take(1))
			.subscribe((definition) => {
				this.definition.setValue(definition);
				this.wordDefinitionEl.nativeElement.placeholder = "";
				this.wordDefinitionEl.nativeElement.disabled = false;
			});
		this.isDefinitionFetched = true;
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
