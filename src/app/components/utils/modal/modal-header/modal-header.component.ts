import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-modal-header",
	imports: [CommonModule],
	templateUrl: "./modal-header.component.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModalHeaderComponent {
	@Input() title!: string;
	@Input() showCloseIcon!: boolean;
	@Output() closeButtonClicked = new EventEmitter();

	onClose() {
		this.closeButtonClicked.emit();
	}
}
