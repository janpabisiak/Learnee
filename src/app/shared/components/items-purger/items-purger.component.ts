import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonComponent } from "../button/button.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
	selector: "app-items-purger",
	imports: [ButtonComponent, TranslatePipe],
	template: `<app-button
		class="[&>button]:w-full [&>button]:justify-center"
		[type]="'danger'"
		[icon]="'flame-outline'"
		(buttonClicked)="openModal()"
		>{{
			(hasSelectedItems ? "itemlist.deleteSelected" : "itemlist.deleteAll") | translate
		}}</app-button
	>`,
})
export class ItemsPurgerComponent {
	@Input() hasSelectedItems = false;
	@Output() clicked = new EventEmitter();

	openModal() {
		this.clicked.emit();
	}
}
