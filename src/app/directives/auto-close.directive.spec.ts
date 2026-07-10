import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AutoCloseDirective } from "./auto-close.directive";

@Component({
	standalone: true,
	template: `
		<div id="outside">Outside</div>
		<div id="inside" appAutoClose (close)="onClose()">
			<button id="button">Inside Button</button>
		</div>
	`,
	imports: [AutoCloseDirective],
})
class TestComponent {
	closed = false;
	onClose() {
		this.closed = true;
	}
}

describe("AutoCloseDirective", () => {
	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestComponent, AutoCloseDirective],
		}).compileComponents();

		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should NOT emit close when clicking inside", () => {
		const insideButton = fixture.debugElement.query(By.css("#button")).nativeElement;
		insideButton.click();
		fixture.detectChanges();
		expect(component.closed).toBeFalse();
	});

	it("should emit close when clicking outside", () => {
		const outsideDiv = fixture.debugElement.query(By.css("#outside")).nativeElement;
		outsideDiv.click();
		fixture.detectChanges();
		expect(component.closed).toBeTrue();
	});

	it("should emit close when clicking on document", () => {
		document.dispatchEvent(new MouseEvent("click", { bubbles: true }));
		fixture.detectChanges();
		expect(component.closed).toBeTrue();
	});

	it("should emit close when pressing Escape", () => {
		document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
		fixture.detectChanges();
		expect(component.closed).toBeTrue();
	});
});
