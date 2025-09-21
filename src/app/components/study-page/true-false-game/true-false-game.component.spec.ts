import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TrueFalseGameComponent } from "./true-false-game.component";
import { provideHttpClient } from "@angular/common/http";
import { TrueFalseAnswerComponent } from "./true-false-answer/true-false-answer.component";
import { createMockGameService, IMockGameService, mockStages } from "app/app.component.spec";
import { GameService } from "@services/game.service";

describe("TrueFalseGameComponent", () => {
	let component: TrueFalseGameComponent;
	let fixture: ComponentFixture<TrueFalseGameComponent>;
	let mockGameService: IMockGameService;

	beforeEach(async () => {
		mockGameService = createMockGameService();

		await TestBed.configureTestingModule({
			imports: [TrueFalseGameComponent, TrueFalseAnswerComponent],
			providers: [provideHttpClient(), { provide: GameService, useValue: mockGameService }],
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
	});

	it("should set properties depending on component input", () => {
		component.stage = mockStages[0];
		component.ngOnInit();

		expect(component.currentStageId).toBe(0);
		expect(component.data).toEqual(mockStages[0]);
		expect(component.showAnswer).toBeTrue();
	});

	it("should call gameService methods on answerQuestion call", () => {
		component.answerQuestion(true);

		expect(mockGameService.answerTrueFalseGameQuestion).toHaveBeenCalledOnceWith(true);
		expect(mockGameService.goToNextStage).toHaveBeenCalledTimes(1);
		expect(component.showAnswer).toBeTrue();
		expect(component.isVisible).toBeFalse();
	});

	it("should destroy subscription", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");

		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
