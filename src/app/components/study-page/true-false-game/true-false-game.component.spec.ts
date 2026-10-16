import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { GameService } from "@services/game/game.service";
import {
	createMockGameService,
	IMockGameService,
	mockStages,
} from "@services/game/game.service.mock";
import { TrueFalseAnswerComponent } from "./true-false-answer/true-false-answer.component";
import { TrueFalseGameComponent } from "./true-false-game.component";

import { By } from "@angular/platform-browser";
import { provideTranslateService } from "@ngx-translate/core";
import { ButtonComponent } from "@shared/components/button/button.component";

describe("TrueFalseGameComponent", () => {
	let component: TrueFalseGameComponent;
	let fixture: ComponentFixture<TrueFalseGameComponent>;
	let mockGameService: IMockGameService;

	beforeEach(async () => {
		mockGameService = createMockGameService();

		await TestBed.configureTestingModule({
			imports: [TrueFalseGameComponent, TrueFalseAnswerComponent],
			providers: [
				provideHttpClient(),
				provideTranslateService(),
				{ provide: GameService, useValue: mockGameService },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(TrueFalseGameComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should set properties depending on gameService field subscription", () => {
		mockGameService.stages$.next(mockStages);
		mockGameService.currentStageId$.next(1);

		expect(component.currentStageId).toBe(1);
		expect(component.data).toEqual(mockStages[1]);
		expect(component.isVisible).toBeTrue();
		expect(component.isLastStage).toBeTrue();
	});

	it("should set properties depending on component input", () => {
		component.stage = mockStages[0];
		component.ngOnInit();

		expect(component.currentStageId).toBe(0);
		expect(component.data).toEqual(mockStages[0]);
		expect(component.showAnswer).toBeTrue();
	});

	it("should call gameService.submitAnswer on answerQuestion call without changing to the next stage", () => {
		component.answerQuestion(true);

		expect(mockGameService.submitAnswer).toHaveBeenCalledOnceWith(true);
		expect(mockGameService.goToNextStage).not.toHaveBeenCalled();
		expect(component.showAnswer).toBeTrue();
		expect(component.isVisible).toBeFalse();
	});

	it("should not call submitAnswer on answerQuestion when data is already answered", () => {
		component.data = mockStages[0];
		component.answerQuestion(true);

		expect(mockGameService.submitAnswer).not.toHaveBeenCalled();
	});

	it("should call gameService.goToNextStage on nextStage call", () => {
		component.isVisible = true;
		component.nextStage();

		expect(component.isVisible).toBeFalse();
		expect(mockGameService.goToNextStage).toHaveBeenCalledTimes(1);
	});

	it("should call gameService.submitAnswer with null and update state on skipQuestion call", () => {
		component.data = { ...mockStages[1], answered: false };
		component.skipQuestion();

		expect(mockGameService.submitAnswer).toHaveBeenCalledOnceWith(null);
		expect(component.showAnswer).toBeTrue();
		expect(component.isVisible).toBeFalse();
	});

	it("should not call submitAnswer on skipQuestion when data is already answered", () => {
		component.data = { ...mockStages[0], answered: true };
		component.skipQuestion();

		expect(mockGameService.submitAnswer).not.toHaveBeenCalled();
	});

	it("should call skipQuestion on enter keydown when data is not answered", () => {
		component.data = { ...mockStages[1], answered: false };
		spyOn(component, "skipQuestion");

		component.handleKeydown(new KeyboardEvent("keydown", { key: "Enter" }));

		expect(component.skipQuestion).toHaveBeenCalled();
	});

	it("should call nextStage on enter keydown when data is answered", () => {
		component.data = { ...mockStages[0], answered: true };
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

	it("should not call skipQuestion or nextStage on non-enter keydown", () => {
		spyOn(component, "skipQuestion");
		spyOn(component, "nextStage");

		component.handleKeydown(new KeyboardEvent("keydown", { key: "a" }));

		expect(component.skipQuestion).not.toHaveBeenCalled();
		expect(component.nextStage).not.toHaveBeenCalled();
	});

	it("should display Check answer button when not answered and call skipQuestion on click", () => {
		component.data = { ...mockStages[1], answered: false };
		spyOn(component, "skipQuestion");
		fixture.detectChanges();

		const buttonDebugEl = fixture.debugElement.query(By.directive(ButtonComponent));
		expect(buttonDebugEl).toBeTruthy();
		buttonDebugEl.componentInstance.buttonClicked.emit();

		expect(component.skipQuestion).toHaveBeenCalled();
	});

	it("should display Next button when answered and call nextStage on click", () => {
		component.data = { ...mockStages[0], answered: true };
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

	it("should destroy subscription", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");

		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
