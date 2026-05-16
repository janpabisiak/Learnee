import { ITrueFalseGameData } from "./true-false-game.service";

export const createMockTrueFalseGameService = () => ({
	generateTrueFalseGame: jasmine.createSpy("generateTrueFalseGame").and.returnValue({
		word: "test",
		definition: "test definition",
		isCorrect: true,
	} as ITrueFalseGameData),
});

export type IMockTrueFalseGameService = ReturnType<typeof createMockTrueFalseGameService>;
