import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { ButtonComponent } from "@components/utils/button/button.component";
import { GameService } from "@services/game.service";
import { createMockGameService, IMockGameService } from "app/app.component.spec";
import { FillGapsGameComponent } from "./fill-gaps-listening-game/fill-gaps-listening-game.component";
import { GameSelectorComponent } from "./game-selector/game-selector.component";
import { MatchingGameComponent } from "./matching-game/matching-game.component";
import { QuizGameComponent } from "./quiz-game/quiz-game.component";
import { StudyPageComponent } from "./study-page.component";
import { StudyProgressBarComponent } from "./study-progress-bar/study-progress-bar.component";
import { TrueFalseGameComponent } from "./true-false-game/true-false-game.component";

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
				QuizGameComponent,
				MatchingGameComponent,
				TrueFalseGameComponent,
				FillGapsGameComponent,
			],
			providers: [provideHttpClient(), { provide: GameService, useValue: mockGameService }],
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
