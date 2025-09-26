import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { ButtonComponent } from "@components/utils/button/button.component";
import { GameService } from "@services/game.service";
import { createMockGameService, IMockGameService } from "app/app.component.spec";
import { GameSelectorComponent } from "./game-selector/game-selector.component";
import { StudyPageComponent } from "./study-page.component";
import { StudyProgressBarComponent } from "./study-progress-bar/study-progress-bar.component";
import { GameSectionComponent } from "./game-section/game-section.component";
import { provideTranslateService } from "@ngx-translate/core";

describe("StudyPageComponent", () => {
	let component: StudyPageComponent;
	let fixture: ComponentFixture<StudyPageComponent>;
	let mockGameService: IMockGameService;

	beforeEach(async () => {
		mockGameService = createMockGameService();

		await TestBed.configureTestingModule({
			imports: [
				StudyPageComponent,
				ButtonComponent,
				GameSelectorComponent,
				StudyProgressBarComponent,
				GameSectionComponent,
			],
			providers: [
				provideHttpClient(),
				{ provide: GameService, useValue: mockGameService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(StudyPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should destroy subscription on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");
		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
