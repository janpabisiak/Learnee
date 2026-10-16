import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { By } from "@angular/platform-browser";
import { provideTranslateService } from "@ngx-translate/core";
import { GameService } from "@services/game/game.service";
import {
	createMockGameService,
	IMockGameService,
	mockStages,
} from "@services/game/game.service.mock";
import { ButtonComponent } from "@shared/components/button/button.component";
import { QuestionAnswerComponent } from "./question-answer/question-answer.component";
import { QuizGameComponent } from "./quiz-game.component";

describe("QuizGameComponent", () => {
	let component: QuizGameComponent;
	let fixture: ComponentFixture<QuizGameComponent>;
	let mockGameService: IMockGameService;

	beforeEach(async () => {
		mockGameService = createMockGameService();

		await TestBed.configureTestingModule({
			imports: [QuizGameComponent, QuestionAnswerComponent],
			providers: [
				provideHttpClient(),
				provideTranslateService(),
				{ provide: GameService, useValue: mockGameService },
			],
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
		expect(component.isLastStage).toBeTrue();
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

	it("should call gameService.goToNextStage and set isVisible to false on nextStage call", () => {
		component.isVisible = true;
		component.nextStage();

		expect(component.isVisible).toBeFalse();
		expect(mockGameService.goToNextStage).toHaveBeenCalledTimes(1);
	});

	it("should call gameService.submitAnswer with -1 and changeVisibility on skipQuestion call", () => {
		component.question = { ...mockStages[1].data, answered: false };
		spyOn(component, "changeVisibility");

		component.skipQuestion();

		expect(mockGameService.submitAnswer).toHaveBeenCalledOnceWith(-1);
		expect(component.changeVisibility).toHaveBeenCalled();
	});

	it("should not call submitAnswer on skipQuestion call if question is already answered", () => {
		component.question = { ...mockStages[1].data, answered: true };
		component.skipQuestion();

		expect(mockGameService.submitAnswer).not.toHaveBeenCalled();
	});

	it("should call skipQuestion on eEnter keydown when question is not answered", () => {
		component.question = { ...mockStages[1].data, answered: false };
		spyOn(component, "skipQuestion");

		component.handleKeydown(new KeyboardEvent("keydown", { key: "Enter" }));

		expect(component.skipQuestion).toHaveBeenCalled();
	});

	it("should call nextStage on enter keydown when question is answered", () => {
		component.question = { ...mockStages[1].data, answered: true };
		spyOn(component, "nextStage");

		component.handleKeydown(new KeyboardEvent("keydown", { key: "Enter" }));

		expect(component.nextStage).toHaveBeenCalled();
	});

	it("should not call skipQuestion or nextStage on enter keydown when stage is set", () => {
		component.stage = mockStages[0];
		spyOn(component, "skipQuestion");
		spyOn(component, "nextStage");

		component.handleKeydown(new KeyboardEvent("keydown", { key: "Enter" }));

		expect(component.skipQuestion).not.toHaveBeenCalled();
		expect(component.nextStage).not.toHaveBeenCalled();
	});

	it("should not call skipQuestion or nextStage on non-Enter keydown", () => {
		spyOn(component, "skipQuestion");
		spyOn(component, "nextStage");

		component.handleKeydown(new KeyboardEvent("keydown", { key: "a" }));

		expect(component.skipQuestion).not.toHaveBeenCalled();
		expect(component.nextStage).not.toHaveBeenCalled();
	});

	it("should display Check answer button when not answered and call skipQuestion on click", () => {
		component.question = { ...mockStages[1].data, answered: false };
		spyOn(component, "skipQuestion");
		fixture.detectChanges();

		const buttonDebugEl = fixture.debugElement.query(By.directive(ButtonComponent));
		expect(buttonDebugEl).toBeTruthy();
		buttonDebugEl.componentInstance.buttonClicked.emit();

		expect(component.skipQuestion).toHaveBeenCalled();
	});

	it("should display Next button when answered and call nextStage on click", () => {
		component.question = { ...mockStages[1].data, answered: true };
		spyOn(component, "nextStage");
		fixture.detectChanges();

		const buttonDebugEl = fixture.debugElement.query(By.directive(ButtonComponent));
		expect(buttonDebugEl).toBeTruthy();
		buttonDebugEl.componentInstance.buttonClicked.emit();

		expect(component.nextStage).toHaveBeenCalled();
	});

	it("should not display any button when stage input is provided", () => {
		component.stage = mockStages[0];
		fixture.detectChanges();

		const buttonDebugEl = fixture.debugElement.query(By.directive(ButtonComponent));
		expect(buttonDebugEl).toBeNull();
	});

	it("should destroy subscription on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");
		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
