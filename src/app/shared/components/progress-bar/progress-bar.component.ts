import { NgClass } from "@angular/common";
import { Component, Input } from "@angular/core";
import { EProgressBarTypes } from "@shared/constants/progress-bar.constants";

@Component({
	selector: "app-progress-bar",
	imports: [NgClass],
	templateUrl: "./progress-bar.component.html",
})
export class ProgressBarComponent {
	@Input({ required: true }) progress = 0;
	@Input() type: string = EProgressBarTypes.Default;
	@Input() tooltipContent!: string;
	EProgressBarTypes = EProgressBarTypes;
}
