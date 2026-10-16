import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { GameService } from "@services/game/game.service";
import { createMockGameService, IMockGameService } from "@services/game/game.service.mock";
import { QuestionAnswerComponent } from "./question-answer.component";

describe("QuestionAnswerComponent", () => {
	let component: QuestionAnswerComponent;
	let fixture: ComponentFixture<QuestionAnswerComponent>;
	let mockGameService: IMockGameService;

	beforeEach(async () => {
		mockGameService = createMockGameService();

		await TestBed.configureTestingModule({
			imports: [QuestionAnswerComponent],
			providers: [provideHttpClient(), { provide: GameService, useValue: mockGameService }],
		}).compileComponents();

		fixture = TestBed.createComponent(QuestionAnswerComponent);
		component = fixture.componentInstance;
		component.answer = {
			id: 1,
			content: "test",
			isCorrect: true,
		};
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should call submitAnswer and emit answered on answerQuestion call", () => {
		const emitSpy = spyOn(component.answered, "emit");
		component.answerQuestion(1);

		expect(mockGameService.submitAnswer).toHaveBeenCalledOnceWith(1);
		expect(mockGameService.goToNextStage).not.toHaveBeenCalled();
		expect(emitSpy).toHaveBeenCalledTimes(1);
	});

	it("should not call submitAnswer on answerQuestion call when showAnswer is true", () => {
		component.showAnswer = true;
		const emitSpy = spyOn(component.answered, "emit");
		component.answerQuestion(1);

		expect(mockGameService.submitAnswer).not.toHaveBeenCalled();
		expect(emitSpy).not.toHaveBeenCalled();
	});
});
