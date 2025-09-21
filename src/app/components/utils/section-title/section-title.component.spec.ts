import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SectionTitleComponent } from "./section-title.component";

describe("SectionTitleComponent", () => {
	let component: SectionTitleComponent;
	let fixture: ComponentFixture<SectionTitleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SectionTitleComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SectionTitleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should emit buttonClicked event on button click", () => {
		const emitSpy = spyOn(component.buttonClicked, "emit");
		component.onButtonClicked();

		expect(emitSpy).toHaveBeenCalledTimes(1);
	});
});
