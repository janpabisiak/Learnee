import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Subscription } from "rxjs";
import { WordsService } from "./words.service";
import { IWord } from "../types/word.interface";

@Injectable({
	providedIn: "root",
})
export class AddWordFormService {
	form: FormGroup;
	private isSubmitAttempted = new BehaviorSubject<boolean>(false);
	private isSubmitDisabled = new BehaviorSubject<boolean>(false);
	private subscriptions = new Subscription();
	wordToEditData: IWord | null = null;
	isSubmitAttempted$ = this.isSubmitAttempted.asObservable();
	isSubmitDisabled$ = this.isSubmitDisabled.asObservable();
	isEditing = false;

	constructor(private wordsService: WordsService) {
		this.form = new FormGroup({
			word: new FormControl<string>("", [Validators.required, Validators.maxLength(100)]),
			definition: new FormControl<string>("", [
				Validators.required,
				Validators.maxLength(10_000),
			]),
		});

		this.setupSubscriptions();
	}

	setupSubscriptions() {
		this.subscriptions.add(
			this.form.statusChanges.subscribe(() => {
				if (this.isSubmitAttempted.value) {
					this.isSubmitDisabled.next(!this.form.valid);
				}
			})
		);
	}

	setupForEditing(word: IWord) {
		this.wordToEditData = word;
		this.isEditing = !this.wordToEditData?.toBeAdded;

		this.word.setValue(word.name);
		this.definition.setValue(word.definition);
	}

	isFormValid() {
		this.isSubmitAttempted.next(true);
		this.isSubmitDisabled.next(!this.form.valid);
		return this.form.valid;
	}

	submitForm() {
		if (!this.isFormValid()) return;

		const [word, definition] = [this.word.value, this.definition.value];

		if (!this.isEditing) {
			this.wordsService.addWord(word, definition);
		} else {
			this.wordsService.editWord(this.wordToEditData!.id, word, definition);
		}
	}

	reset() {
		this.form.reset();
		this.wordToEditData = null;
		this.isEditing = false;
		this.isSubmitAttempted.next(false);
		this.isSubmitDisabled.next(false);
	}

	getIsEditing() {
		return this.isEditing;
	}

	get word() {
		return this.form.controls["word"];
	}

	get definition() {
		return this.form.controls["definition"];
	}
}
