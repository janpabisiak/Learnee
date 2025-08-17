import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonComponent } from "@components/utils/button/button.component";

@Component({
	selector: "app-modal-footer",
	imports: [ButtonComponent, CommonModule],
	templateUrl: "./modal-footer.component.html",
})
export class ModalFooterComponent {
	@Input() primaryButtonText!: string;
	@Input() secondaryButtonText!: string;
	@Input() primaryButtonDisabled: boolean = false;
	@Input() secondaryButtonDisabled: boolean = false;
	@Output() primaryButtonClicked = new EventEmitter();
	@Output() secondaryButtonClicked = new EventEmitter();

	onPrimaryButtonClicked() {
		this.primaryButtonClicked.emit();
	}

	onSecondaryButtonClicked() {
		this.secondaryButtonClicked.emit();
	}
}
