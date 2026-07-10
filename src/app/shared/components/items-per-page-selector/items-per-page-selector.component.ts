import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
	selector: "app-items-per-page-selector",
	imports: [TranslatePipe],
	templateUrl: "./items-per-page-selector.component.html",
})
export class ItemsPerPageSelectorComponent {
	@Input({ required: true }) options!: number[];
	@Input({ required: true }) currentOption!: number;
	@Output() changed = new EventEmitter<number>();

	changeOption(value: number) {
		this.changed.emit(value);
	}
}
