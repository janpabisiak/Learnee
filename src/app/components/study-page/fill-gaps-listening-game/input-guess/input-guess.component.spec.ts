import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InputGuessComponent } from "./input-guess.component";

describe("InputGuessComponent", () => {
	let component: InputGuessComponent;
	let fixture: ComponentFixture<InputGuessComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [InputGuessComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(InputGuessComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should emit valueChanged event on onInput call", () => {
		const emitSpy = spyOn(component.valueChanged, "emit");
		const inputElement = document.createElement("input");
		inputElement.value = "test";
		component.onInput(inputElement);

		expect(emitSpy).toHaveBeenCalledOnceWith("test");
	});
});
