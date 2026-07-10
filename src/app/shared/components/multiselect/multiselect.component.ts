import { NgClass } from "@angular/common";
import {
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslatePipe } from "@ngx-translate/core";
import { AutoCloseDirective } from "app/directives/auto-close.directive";

interface IMultiSelectOption {
	key: number;
	value: string;
}

@Component({
	selector: "app-multiselect",
	standalone: true,
	imports: [NgClass, FormsModule, AutoCloseDirective, TranslatePipe],
	templateUrl: "./multiselect.component.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MultiselectComponent implements OnInit {
	@Input() placeholder: string = "Select options...";
	@Input() selectedOptions: IMultiSelectOption[] = [];
	@Input() options: IMultiSelectOption[] = [];
	@Output() changed = new EventEmitter<number[]>();

	searchQuery = "";
	selectedItems: IMultiSelectOption[] = [];
	isOpen = false;

	ngOnInit(): void {
		this.selectedItems = [...this.selectedOptions];
	}

	get filteredOptions() {
		if (!this.searchQuery) return this.options;

		return this.options.filter((option) => {
			const value = option.value;
			return value && value.toLowerCase().includes(this.searchQuery.toLowerCase());
		});
	}

	isSelected(option: IMultiSelectOption): boolean {
		return this.selectedItems.some((item) => item.key === option.key);
	}

	toggleOption(option: IMultiSelectOption) {
		if (this.isSelected(option)) {
			this.selectedItems = this.selectedItems.filter((item) => item.value !== option.value);
		} else {
			this.selectedItems.push(option);
		}

		this.changed.emit(this.selectedItems.map((item) => item.key));
	}

	close() {
		this.isOpen = false;
	}
}
