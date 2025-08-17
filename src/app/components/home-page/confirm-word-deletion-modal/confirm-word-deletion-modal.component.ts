import { Component } from "@angular/core";
import { ModalComponent } from "@components/utils/modal/modal.component";

@Component({
	selector: "app-confirm-word-deletion-modal",
	imports: [ModalComponent],
	templateUrl: "./confirm-word-deletion-modal.component.html",
})
export class ConfirmWordDeletionModalComponent {}
