import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ToasterComponent } from "./toaster.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("ToasterComponent", () => {
	let component: ToasterComponent;
	let fixture: ComponentFixture<ToasterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ToasterComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(ToasterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
