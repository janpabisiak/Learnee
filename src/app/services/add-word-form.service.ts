import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Subscription } from "rxjs";
import { WordsService } from "./words.service";

@Injectable({
	providedIn: "root",
})
export class AddWordFormService {
	form: FormGroup;
	private isSubmitAttempted = new BehaviorSubject<boolean>(false);
	private isSubmitDisabled = new BehaviorSubject<boolean>(false);
	private subscriptions = new Subscription();
	isSubmitAttempted$ = this.isSubmitAttempted.asObservable();
	isSubmitDisabled$ = this.isSubmitDisabled.asObservable();

	constructor(private wordsService: WordsService) {
		this.form = new FormGroup({
			word: new FormControl("", [Validators.required, Validators.maxLength(100)]),
			definition: new FormControl("", [Validators.required, Validators.maxLength(10_000)]),
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

	isFormValid() {
		this.isSubmitAttempted.next(true);
		this.isSubmitDisabled.next(true);

		if (this.form.valid) {
			return true;
		} else {
			return false;
		}
	}

	submitForm() {
		this.wordsService.addWord(this.word.value, this.definition.value);
	}

	destroy() {
		this.subscriptions.unsubscribe();
		this.form.reset();
	}

	get word() {
		return this.form.controls["word"];
	}

	get definition() {
		return this.form.controls["definition"];
	}
}
