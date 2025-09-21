import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TagComponent } from "../tag/tag.component";
import { ButtonComponent } from "../button/button.component";
import { NgIf } from "@angular/common";

@Component({
	selector: "app-section-title",
	imports: [TagComponent, ButtonComponent, NgIf],
	templateUrl: "./section-title.component.html",
})
export class SectionTitleComponent {
	@Input({ required: true }) title!: string;
	@Input() tagContent!: string;
	@Input() buttonContent!: string;
	@Input() buttonType!: string;
	@Input() buttonIcon!: string;
	@Input() buttonDisabled = false;
	@Output() buttonClicked = new EventEmitter();

	onButtonClicked() {
		this.buttonClicked.emit();
	}
}
