import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MultiselectComponent } from "./multiselect.component";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

describe("MultiselectComponent", () => {
	let component: MultiselectComponent;
	let fixture: ComponentFixture<MultiselectComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MultiselectComponent, FormsModule, TranslateModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(MultiselectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should filter options based on search query", () => {
		component.options = [
			{ key: 1, value: "Apple" },
			{ key: 2, value: "Banana" },
		];
		component.searchQuery = "app";

		fixture.detectChanges();

		expect(component.filteredOptions.length).toBe(1);
		expect(component.filteredOptions[0].value).toBe("Apple");
	});

	it("should select and deselect options", () => {
		const option = { key: 1, value: "Apple" };
		component.options = [option];

		component.toggleOption(option);

		expect(component.selectedItems.length).toBe(1);
		expect(component.isSelected(option)).toBe(true);

		component.toggleOption(option);

		expect(component.selectedItems.length).toBe(0);
		expect(component.isSelected(option)).toBe(false);
	});

	it("should close dropdown when clicking outside", () => {
		component.isOpen = true;
		document.dispatchEvent(new MouseEvent("click"));

		expect(component.isOpen).toBe(false);
	});

	it("should close dropdown when pressing Escape key", () => {
		component.isOpen = true;

		const event = new KeyboardEvent("keydown", { key: "Escape" });
		document.dispatchEvent(event);

		expect(component.isOpen).toBe(false);
	});

	it("should emit changed event when an option is toggled", () => {
		spyOn(component.changed, "emit");
		const option = { key: 1, value: "Apple" };
		component.toggleOption(option);

		expect(component.changed.emit).toHaveBeenCalledWith([1]);
	});
});
