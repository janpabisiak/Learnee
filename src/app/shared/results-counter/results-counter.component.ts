import { NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { IResultRange } from "../../types/resultRange.interface";

@Component({
	selector: "app-results-counter",
	imports: [NgIf, TranslatePipe],
	templateUrl: "./results-counter.component.html",
})
export class ResultsCounterComponent {
	@Input() resultRange: IResultRange | null = null;
	@Input({ required: true }) total!: number;
}
