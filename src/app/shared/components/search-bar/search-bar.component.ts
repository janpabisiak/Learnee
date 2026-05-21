import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
	selector: "app-search-bar",
	imports: [TranslatePipe],
	template: `<input
		class="p-3 w-full bg-gray-100 rounded-md border-1 border-gray-200 placeholder-gray-500 h-12 outline-0 dark:bg-zinc-800 dark:border-zinc-700"
		type="text"
		[placeholder]="translationKey | translate"
	/>`,
})
export class SearchBarComponent {
	@Input({ required: true }) translationKey!: string;
	@Output() searched = new EventEmitter<string>();
	@HostListener("input", ["$event.target"])
	search(hostEl: HTMLInputElement) {
		this.searched.emit(hostEl.value);
	}
}
