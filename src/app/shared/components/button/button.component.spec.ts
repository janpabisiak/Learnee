import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ButtonComponent } from "./button.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("ButtonComponent", () => {
	let component: ButtonComponent;
	let fixture: ComponentFixture<ButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ButtonComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(ButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should emit buttonClicked on onClick call", () => {
		const emitSpy = spyOn(component.buttonClicked, "emit");
		component.onClick();

		expect(emitSpy).toHaveBeenCalledTimes(1);
	});

	it("should emit enterClicked on enter keydown when not disabled", () => {
		const emitSpy = spyOn(component.enterClicked, "emit");
		component.handleKeydown(new KeyboardEvent("keydown", { key: "Enter" }));

		expect(emitSpy).toHaveBeenCalledTimes(1);
	});

	it("should not emit enterClicked on enter keydown when disabled", () => {
		component.disabled = true;
		const emitSpy = spyOn(component.enterClicked, "emit");
		component.handleKeydown(new KeyboardEvent("keydown", { key: "Enter" }));

		expect(emitSpy).not.toHaveBeenCalled();
	});

	it("should emit escapeClicked on escape keydown when not disabled", () => {
		const emitSpy = spyOn(component.escapeClicked, "emit");
		component.handleKeydown(new KeyboardEvent("keydown", { key: "Escape" }));

		expect(emitSpy).toHaveBeenCalledTimes(1);
	});

	it("should not emit escapeClicked on escape keydown when disabled", () => {
		component.disabled = true;
		const emitSpy = spyOn(component.escapeClicked, "emit");
		component.handleKeydown(new KeyboardEvent("keydown", { key: "Escape" }));

		expect(emitSpy).not.toHaveBeenCalled();
	});
});
