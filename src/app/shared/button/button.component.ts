import { CommonModule } from "@angular/common";
import {
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	EventEmitter,
	HostListener,
	Input,
	Output,
} from "@angular/core";

@Component({
	selector: "app-button",
	imports: [CommonModule],
	templateUrl: "./button.component.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonComponent {
	@Input({ required: true }) type!: string;
	@Input() icon!: string;
	@Input() disabled = false;
	@Output() buttonClicked = new EventEmitter();
	@Output() escapeClicked = new EventEmitter();
	@Output() enterClicked = new EventEmitter();
	EButtonTypes = EButtonTypes;
	@HostListener("window:keydown", ["$event"]) handleKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case "Enter":
				this.enterClicked.emit();
				break;
			case "Escape":
				this.escapeClicked.emit();
				break;
		}
	}

	onClick() {
		this.buttonClicked.emit();
	}
}

enum EButtonTypes {
	Primary = "primary",
	Secondary = "secondary",
	Danger = "danger",
	NoBackground = "no-background",
}
