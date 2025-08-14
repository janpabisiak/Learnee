import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-button",
	imports: [CommonModule],
	templateUrl: "./button.component.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonComponent {
	@Input({ required: true }) type!: string;
	@Input() icon!: string;
	@Output() buttonClicked = new EventEmitter();
	EButtonTypes = EButtonTypes;

	onClick() {
		this.buttonClicked.emit();
	}
}

enum EButtonTypes {
	Primary = "primary",
	Secondary = "secondary",
	NoBackground = "no-background",
}
