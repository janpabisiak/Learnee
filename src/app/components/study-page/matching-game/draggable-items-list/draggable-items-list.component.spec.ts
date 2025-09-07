import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DraggableItemsListComponent } from "./draggable-items-list.component";

describe("DraggableItemsListComponent", () => {
	let component: DraggableItemsListComponent;
	let fixture: ComponentFixture<DraggableItemsListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DraggableItemsListComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DraggableItemsListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
