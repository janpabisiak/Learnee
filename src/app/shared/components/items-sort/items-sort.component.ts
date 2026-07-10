import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { ECommonSortTypes } from "@shared/constants/sorting.constants";

@Component({
	selector: "app-items-sort",
	imports: [TranslatePipe],
	templateUrl: "./items-sort.component.html",
})
export class ItemsSortComponent<T = ECommonSortTypes> {
	@ViewChild("select") sortTypeSelectEl!: ElementRef<HTMLSelectElement>;
	@Input({ required: true }) sortOptions: { type: T; translationKey: string }[] = [];
	@Input() currentSortOption: T = ECommonSortTypes.IdDESC as T;
	@Output() changed = new EventEmitter<T>();

	changeSortType(value: string) {
		this.changed.emit(value as T);
	}
}
