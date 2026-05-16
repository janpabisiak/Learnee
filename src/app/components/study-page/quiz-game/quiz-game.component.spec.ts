import { ComponentFixture, TestBed } from "@angular/core/testing";

import { QuizGameComponent } from "./quiz-game.component";
import { provideHttpClient } from "@angular/common/http";
import { QuestionAnswerComponent } from "./question-answer/question-answer.component";
import {
	createMockGameService,
	IMockGameService,
	mockStages,
} from "@services/game/game.service.mock";
import { GameService } from "@services/game/game.service";

describe("QuizGameComponent", () => {
	let component: QuizGameComponent;
	let fixture: ComponentFixture<QuizGameComponent>;
	let mockGameService: IMockGameService;

	beforeEach(async () => {
		mockGameService = createMockGameService();

		await TestBed.configureTestingModule({
			imports: [QuizGameComponent, QuestionAnswerComponent],
			providers: [provideHttpClient(), { provide: GameService, useValue: mockGameService }],
		}).compileComponents();

		fixture = TestBed.createComponent(QuizGameComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should update properties values depending on subscription", () => {
		mockGameService.stages$.next(mockStages);
		mockGameService.currentStageId$.next(1);

		expect(component.currentStageId).toBe(1);
		expect(component.question).toEqual(mockStages[1].data);
		expect(component.isVisible).toBeTrue();
	});

	it("should set properties values depending on component input", () => {
		component.stage = mockStages[0];
		component.ngOnInit();

		expect(component.currentStageId).toBe(0);
		expect(component.question).toEqual(mockStages[0].data);
	});

	it("should change isVisible on changeVisibility call", () => {
		component.changeVisibility();

		expect(component.isVisible).toBeFalse();
	});

	it("should destroy subscription on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");
		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
