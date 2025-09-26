import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeatMapComponent } from "./heat-map.component";
import { provideTranslateService } from "@ngx-translate/core";

describe("HeatMapComponent", () => {
	let component: HeatMapComponent;
	let fixture: ComponentFixture<HeatMapComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HeatMapComponent],
			providers: [
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HeatMapComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should remove subscription on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");

		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
