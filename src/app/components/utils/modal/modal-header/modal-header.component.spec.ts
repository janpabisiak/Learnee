import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ModalHeaderComponent } from "./modal-header.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("ModalHeaderComponent", () => {
	let component: ModalHeaderComponent;
	let fixture: ComponentFixture<ModalHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ModalHeaderComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(ModalHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should call emit on onClose call", () => {
		const emitSpy = spyOn(component.closeButtonClicked, "emit");
		component.onClose();

		expect(emitSpy).toHaveBeenCalledTimes(1);
	});
});
