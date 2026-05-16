import { IFillGapsListeningGameData } from "./fill-gaps-listening-game.service";

export const createMockFillGapsListeningGameService = () => ({
	generateFillGapsListeningGame: jasmine.createSpy("generateFillGapsListeningGame").and.returnValue({
		word: "test",
		definition: "test definition",
	} as IFillGapsListeningGameData),
});

export type IMockFillGapsListeningGameService = ReturnType<typeof createMockFillGapsListeningGameService>;
