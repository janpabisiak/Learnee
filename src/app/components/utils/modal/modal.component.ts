import {
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	EventEmitter,
	HostListener,
	Input,
	Output,
} from "@angular/core";
import { ModalHeaderComponent } from "./modal-header/modal-header.component";
import { ModalFooterComponent } from "./modal-footer/modal-footer.component";

@Component({
	selector: "app-modal",
	imports: [ModalHeaderComponent, ModalFooterComponent],
	templateUrl: "./modal.component.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModalComponent {
	@Input({ required: true }) title!: string;
	@Input() primaryButtonText!: string;
	@Input() secondaryButtonText!: string;
	@Input() showCloseIcon: boolean = true;
	@Input() primaryButtonDisabled: boolean = false;
	@Input() secondaryButtonDisabled: boolean = false;
	@Input() closeOnClickOutside: boolean = false;
	@Output() primaryButtonClicked = new EventEmitter();
	@Output() secondaryButtonClicked = new EventEmitter();
	@Output() closeButtonClicked = new EventEmitter();
	@HostListener("click", ["$event.target"])
	onClick(el: HTMLElement) {
		if (el.id === "overflow" && this.closeOnClickOutside) this.onClose();
	}

	onClose() {
		this.closeButtonClicked.emit();
	}

	onPrimaryButtonClicked() {
		this.primaryButtonClicked.emit();
	}

	onSecondaryButtonClicked() {
		this.secondaryButtonClicked.emit();
	}
}
