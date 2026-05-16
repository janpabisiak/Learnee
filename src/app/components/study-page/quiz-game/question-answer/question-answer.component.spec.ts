import { ComponentFixture, TestBed } from "@angular/core/testing";

import { QuestionAnswerComponent } from "./question-answer.component";
import { provideHttpClient } from "@angular/common/http";
import { createMockGameService, IMockGameService } from "@services/game/game.service.mock";
import { GameService } from "@services/game/game.service";

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

	it("should call gameService methods on answerQuestion call", () => {
		const emitSpy = spyOn(component.answered, "emit");
		component.answerQuestion(1);

		expect(mockGameService.answerQuizQuestion).toHaveBeenCalledOnceWith(1);
		expect(mockGameService.goToNextStage).toHaveBeenCalledTimes(1);
		expect(emitSpy).toHaveBeenCalledTimes(1);
	});
});
