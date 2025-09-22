import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PaginationButtonsComponent } from "./pagination-buttons.component";
import { IMockAddWordFormService } from "app/app.component.spec";

describe("PaginationButtonsComponent", () => {
	let component: PaginationButtonsComponent;
	let fixture: ComponentFixture<PaginationButtonsComponent>;
	let mockPaginationService: IMockAddWordFormService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PaginationButtonsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PaginationButtonsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
