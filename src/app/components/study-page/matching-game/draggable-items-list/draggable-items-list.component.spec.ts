import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DraggableItemsListComponent } from "./draggable-items-list.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CdkDrag, CdkDragDrop, CdkDropList } from "@angular/cdk/drag-drop";
import { NgClass } from "@angular/common";

describe("DraggableItemsListComponent", () => {
	let component: DraggableItemsListComponent;
	let fixture: ComponentFixture<DraggableItemsListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DraggableItemsListComponent, CdkDrag, CdkDropList, NgClass],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(DraggableItemsListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should emit reordered event when reordering items", () => {
		const emitSpy = spyOn(component.reordered, "emit");
		const event: CdkDragDrop<string[]> = {
			previousIndex: 0,
			currentIndex: 1,
			item: null as any,
			container: null as any,
			previousContainer: null as any,
			isPointerOverContainer: true,
			distance: { x: 0, y: 0 },
			dropPoint: { x: 0, y: 0 },
			event: {} as DragEvent,
		};
		component.reorder(["test1", "test2"], event);

		expect(emitSpy).toHaveBeenCalledOnceWith([["test1", "test2"], event]);
	});
});
