import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LogoComponent } from "./logo.component";
import { provideRouter, RouterLink } from "@angular/router";

describe("LogoComponent", () => {
	let component: LogoComponent;
	let fixture: ComponentFixture<LogoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LogoComponent, RouterLink],
			providers: [provideRouter([])],
		}).compileComponents();

		fixture = TestBed.createComponent(LogoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
