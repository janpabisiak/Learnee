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
});
