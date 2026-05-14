import { CommonModule } from "@angular/common";
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalComponent } from "@components/utils/modal/modal.component";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { WordsFormService } from "@services/words-form/words-form.service";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { WordsService } from "@services/words/words.service";
import { Subscription, take } from "rxjs";

@Component({
	selector: "app-add-edit-word-modal",
	standalone: true,
	templateUrl: "./add-edit-word-modal.component.html",
	imports: [ModalComponent, ReactiveFormsModule, CommonModule, TranslatePipe],
})
export class AddEditWordModalComponent implements OnInit, OnDestroy {
	@ViewChild("wordDefinition") wordDefinitionEl!: ElementRef<HTMLTextAreaElement>;

	private subscriptions = new Subscription();
	isSubmitAttempted = false;
	isSubmitDisabled = false;
	isDefinitionFetched = false;
	translations: Record<string, string> | null = null;

	constructor(
		private modalService: ModalService,
		private wordsFormService: WordsFormService,
		private wordsService: WordsService,
		private renderer: Renderer2,
		private translation: TranslateService
	) {}

	ngOnInit() {
		this.subscriptions.add(
			this.wordsFormService.isSubmitAttempted$.subscribe((isAttempted) => {
				this.isSubmitAttempted = isAttempted;
			})
		);

		this.subscriptions.add(
			this.wordsFormService.isSubmitDisabled$.subscribe((isDisabled) => {
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

		this.translation
			.get([
				"modal.add.title",
				"modal.edit.title",
				"modal.add.word.enter",
				"modal.label.add",
				"modal.label.save",
				"modal.label.cancel",
			])
			.pipe(take(1))
			.subscribe((translations) => {
				this.translations = translations;
			});
	}

	toggleIsAddWordModalOpen(state: boolean) {
		this.modalService.toggleModal(EModalType.WordAdding, state);
	}

	submitForm() {
		const isFormValid = this.wordsFormService.isFormValid();

		if (isFormValid) {
			this.wordsFormService.submitForm();
			this.modalService.toggleModal(EModalType.WordAdding, false);
		} else {
			this.form.markAllAsTouched();
		}
	}

	fetchWordDefinition() {
		if (this.isDefinitionFetched || !this.word.value || this.definition.value) return;

		this.wordDefinitionEl.nativeElement.placeholder = "Auto fetching definition...";
		this.wordDefinitionEl.nativeElement.disabled = true;
		this.wordsService
			.fetchDefinition$(this.word.value)
			.pipe(take(1))
			.subscribe((definition: string) => {
				this.definition.setValue(definition);
				this.wordDefinitionEl.nativeElement.placeholder = "";
				this.wordDefinitionEl.nativeElement.disabled = false;
			});
		this.isDefinitionFetched = true;
	}

	get isEditing() {
		return this.wordsFormService.getIsEditing();
	}

	get form() {
		return this.wordsFormService.form;
	}

	get word() {
		return this.wordsFormService.word;
	}

	get definition() {
		return this.wordsFormService.definition;
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
		this.wordsFormService.reset();
	}
}
