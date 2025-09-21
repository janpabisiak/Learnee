import { Component, Input } from "@angular/core";

@Component({
	selector: "app-progress-bar",
	imports: [],
	templateUrl: "./progress-bar.component.html",
})
export class ProgressBarComponent {
	@Input({ required: true }) progress!: number;
	@Input() tooltipContent!: string;
}
