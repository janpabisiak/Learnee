import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonComponent } from "../button/button.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
	selector: "app-items-selection-control-buttons",
	imports: [ButtonComponent, TranslatePipe],
	templateUrl: "./items-selection-control-buttons.component.html",
})
export class ItemsSelectionControlButtonsComponent {
	@Input() hasSelectedItems = false;
	@Output() selectAllClicked = new EventEmitter();
	@Output() unselectAllClicked = new EventEmitter();

	selectAllVisible() {
		this.selectAllClicked.emit();
	}

	unselectAll() {
		this.unselectAllClicked.emit();
	}
}
