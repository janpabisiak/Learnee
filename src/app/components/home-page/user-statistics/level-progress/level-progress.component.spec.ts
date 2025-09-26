import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LevelProgressComponent } from "./level-progress.component";
import { ProgressBarComponent } from "@components/utils/progress-bar/progress-bar.component";
import { provideTranslateService } from "@ngx-translate/core";

describe("LevelProgressComponent", () => {
	let component: LevelProgressComponent;
	let fixture: ComponentFixture<LevelProgressComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LevelProgressComponent, ProgressBarComponent],
			providers: [
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(LevelProgressComponent);
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
