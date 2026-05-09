import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StudyProgressBarComponent } from "./study-progress-bar.component";
import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";

describe("StudyProgressBarComponent", () => {
	let component: StudyProgressBarComponent;
	let fixture: ComponentFixture<StudyProgressBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [StudyProgressBarComponent],
			providers: [
				provideHttpClient(),
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(StudyProgressBarComponent);
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
