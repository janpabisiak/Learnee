import { IQuestion } from "../../types/question.interface";

export const createMockQuizService = () => ({
	generateQuestion: jasmine.createSpy("generateQuestion").and.returnValue({
		content: "test",
		possibleAnswers: [],
		answered: false,
		answeredCorrect: false,
	} as IQuestion),
	answerQuestion: jasmine.createSpy("answerQuestion").and.callFake((question: IQuestion, _answerId: number) => ({
		...question,
		answered: true,
	})),
});

export type IMockQuizService = ReturnType<typeof createMockQuizService>;
