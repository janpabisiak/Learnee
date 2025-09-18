import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ModalComponent } from "./modal.component";
import { ModalHeaderComponent } from "./modal-header/modal-header.component";
import { ModalFooterComponent } from "./modal-footer/modal-footer.component";

describe("ModalComponent", () => {
	let component: ModalComponent;
	let fixture: ComponentFixture<ModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ModalComponent, ModalHeaderComponent, ModalFooterComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should call onClose method on onClick call", () => {
		component.closeOnClickOutside = true;
		const htmlElement: HTMLElement = document.createElement("div");
		htmlElement.id = "overflow";

		const spy = spyOn(component, "onClose");
		component.onClick(htmlElement);

		expect(spy).toHaveBeenCalledTimes(1);
	});

	it("should emit closeButtonClicked on onClose call", () => {
		const emitSpy = spyOn(component.closeButtonClicked, "emit");
		component.onClose();

		expect(emitSpy).toHaveBeenCalledTimes(1);
	});

	it("should emit primaryButtonClicked on onPrimaryButtonClicked call", () => {
		const emitSpy = spyOn(component.primaryButtonClicked, "emit");
		component.onPrimaryButtonClicked();

		expect(emitSpy).toHaveBeenCalledTimes(1);
	});

	it("should emit secondaryButtonClicked on onSecondaryButtonClicked call", () => {
		const emitSpy = spyOn(component.secondaryButtonClicked, "emit");
		component.onSecondaryButtonClicked();

		expect(emitSpy).toHaveBeenCalledTimes(1);
	});
});
