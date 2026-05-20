import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Subscription } from "rxjs";
import { FoldersService } from "@services/folder/folders.service";
import { IFolder } from "../../types/folder.interface";

@Injectable({
	providedIn: "root",
})
export class FoldersFormService {
	form: FormGroup;
	private isSubmitAttempted = new BehaviorSubject<boolean>(false);
	private isSubmitDisabled = new BehaviorSubject<boolean>(false);
	private subscriptions = new Subscription();
	folderToEditData: IFolder | null = null;
	isSubmitAttempted$ = this.isSubmitAttempted.asObservable();
	isSubmitDisabled$ = this.isSubmitDisabled.asObservable();
	isEditing = false;

	constructor(private foldersService: FoldersService) {
		this.form = new FormGroup({
			name: new FormControl<string>("", [Validators.required, Validators.maxLength(100)]),
			description: new FormControl<string>("", [
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

	setupForEditing(folder: IFolder) {
		this.folderToEditData = folder;
		this.isEditing = true;

		this.name.setValue(folder.name);
		this.description.setValue(folder.description);
	}

	isFormValid() {
		this.isSubmitAttempted.next(true);
		this.isSubmitDisabled.next(!this.form.valid);
		return this.form.valid;
	}

	submitForm() {
		if (!this.isFormValid()) return;

		const [name, description] = [this.name.value.trim(), this.description.value.trim()];

		if (!this.isEditing) {
			this.foldersService.add(name, description);
		} else {
			this.foldersService.edit(this.folderToEditData!.id, name, description);
		}
	}

	reset() {
		this.form.reset();
		this.folderToEditData = null;
		this.isEditing = false;
		this.isSubmitAttempted.next(false);
		this.isSubmitDisabled.next(false);
	}

	getIsEditing() {
		return this.isEditing;
	}

	get name() {
		return this.form.controls["name"];
	}

	get description() {
		return this.form.controls["description"];
	}
}
