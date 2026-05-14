import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WordListSelectionControlButtonComponent } from "./word-list-selection-control-button.component";

describe("WordListSelectionControlButtonComponent", () => {
	let component: WordListSelectionControlButtonComponent;
	let fixture: ComponentFixture<WordListSelectionControlButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [WordListSelectionControlButtonComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(WordListSelectionControlButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
