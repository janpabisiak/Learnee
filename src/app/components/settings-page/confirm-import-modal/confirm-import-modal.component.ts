import { Component, inject, OnInit } from "@angular/core";
import { ModalComponent } from "@components/utils/modal/modal.component";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { TranslateService } from "@ngx-translate/core";
import { NgIf } from "@angular/common";
import { take } from "rxjs";

@Component({
	selector: "app-confirm-import-modal",
	standalone: true,
	imports: [ModalComponent, NgIf],
	templateUrl: "./confirm-import-modal.component.html",
})
export class ConfirmImportModalComponent implements OnInit {
	private modalService = inject(ModalService);
	private localStorageService = inject(LocalStorageService);
	private translation = inject(TranslateService);
	translations: any;

	ngOnInit() {
		this.translation
			.get([
				"modal.import.title",
				"modal.import.description",
				"modal.label.confirm",
				"modal.label.cancel",
			])
			.pipe(take(1))
			.subscribe((translations) => {
				this.translations = translations;
			});
	}

	confirm() {
		const importedData = this.localStorageService.getImportedData();
		if (importedData) {
			this.localStorageService.importData(importedData);
			this.closeModal();
		}
	}

	closeModal() {
		this.modalService.toggleModal(EModalType.ImportConfirmation, false);
		this.localStorageService.setImportedData(null);
	}
}
