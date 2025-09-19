import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ModalFooterComponent } from "./modal-footer.component";
import { ButtonComponent } from "@components/utils/button/button.component";

describe("ModalFooterComponent", () => {
	let component: ModalFooterComponent;
	let fixture: ComponentFixture<ModalFooterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ModalFooterComponent, ButtonComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ModalFooterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
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
