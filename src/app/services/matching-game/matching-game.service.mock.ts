import { IMatch } from "./matching-game.service";

export const createMockMatchingGameService = () => ({
	generateMatchingGame: jasmine.createSpy("generateMatchingGame").and.returnValue([] as IMatch[]),
	checkAnswers: jasmine.createSpy("checkAnswers").and.returnValue([] as boolean[]),
});

export type IMockMatchingGameService = ReturnType<typeof createMockMatchingGameService>;
