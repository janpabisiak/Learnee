import { BehaviorSubject } from "rxjs";
import { EAvailableGames, IStage } from "./game.service";

export const mockStages: IStage[] = [
	{
		id: 0,
		type: EAvailableGames.FillGaps,
		answered: true,
		answeredCorrect: false,
		data: {},
	},
	{
		id: 1,
		type: EAvailableGames.Listening,
		answered: false,
		answeredCorrect: false,
		data: {},
	},
];

export const mockAvailableGames: EAvailableGames[] = [
	EAvailableGames.FillGaps,
	EAvailableGames.Listening,
];

export const mockSelectedGames: EAvailableGames[] = [EAvailableGames.FillGaps];

export const createMockGameService = () => ({
	stages$: new BehaviorSubject<IStage[]>([]),
	currentStageId$: new BehaviorSubject<number>(0),
	selectedGames$: new BehaviorSubject<EAvailableGames[]>([]),
	answerTrueFalseGameQuestion: jasmine.createSpy("answerTrueFalseGameQuestion"),
	answerQuizQuestion: jasmine.createSpy("answerQuizQuestion"),
	answerMatchingGameQuestion: jasmine.createSpy("answerMatchingGameQuestion"),
	answerFillGapsListeningGameQuestion: jasmine.createSpy("answerFillGapsListeningGameQuestion"),
	goToNextStage: jasmine.createSpy("goToNextStage"),
	generateStages: jasmine.createSpy("generateStages"),
	setNumberOfStages: jasmine.createSpy("setNumberOfStages"),
	updateSelectedGames: jasmine.createSpy("updateSelectedGames"),
	cancelGame: jasmine.createSpy("cancelGame"),
});

export type IMockGameService = ReturnType<typeof createMockGameService>;
