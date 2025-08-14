import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-modal-header",
	imports: [],
	templateUrl: "./modal-header.component.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModalHeaderComponent {
	@Input() title!: string;
	@Output() closeButtonClicked = new EventEmitter();

	onClose() {
		this.closeButtonClicked.emit();
	}
}
