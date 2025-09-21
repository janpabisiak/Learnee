import { NgClass } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
	selector: "app-progress-bar",
	imports: [NgClass],
	templateUrl: "./progress-bar.component.html",
})
export class ProgressBarComponent {
	@Input({ required: true }) progress!: number;
	@Input() type: string = EProgressBarTypes.Default;
	@Input() tooltipContent!: string;
	EProgressBarTypes = EProgressBarTypes;
}

export enum EProgressBarTypes {
	Default = "default",
	GameResults = "gameResults",
}
