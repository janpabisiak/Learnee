import { CdkDrag, CdkDragDrop, CdkDropList } from "@angular/cdk/drag-drop";
import { NgClass } from "@angular/common";
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";

@Component({
	selector: "app-draggable-items-list",
	imports: [CdkDrag, CdkDropList, NgClass],
	templateUrl: "./draggable-items-list.component.html",
	styleUrl: "./draggable-items-list.component.css",
	encapsulation: ViewEncapsulation.None,
})
export class DraggableItemsListComponent {
	@Input({ required: true }) items!: string[];
	@Input({ required: true }) answered!: boolean;
	@Input({ required: true }) results: boolean[] = [];
	@Output() reordered = new EventEmitter<[string[], CdkDragDrop<string[]>]>();

	reorder(items: string[], event: CdkDragDrop<string[]>) {
		this.reordered.emit([items, event]);
	}
}
