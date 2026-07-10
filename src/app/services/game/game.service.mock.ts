import { BehaviorSubject } from "rxjs";
import { IStage } from "../../types/stage.interface";
import { EAvailableGames } from "@shared/constants/game.constants";

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
	numberOfStages$: new BehaviorSubject<number>(0),
	selectedFolderIds$: new BehaviorSubject<number[]>([]),
	submitAnswer: jasmine.createSpy("submitAnswer"),
	answerTrueFalseGameQuestion: jasmine.createSpy("answerTrueFalseGameQuestion"),
	answerQuizQuestion: jasmine.createSpy("answerQuizQuestion"),
	answerMatchingGameQuestion: jasmine.createSpy("answerMatchingGameQuestion"),
	answerFillGapsListeningGameQuestion: jasmine.createSpy("answerFillGapsListeningGameQuestion"),
	goToNextStage: jasmine.createSpy("goToNextStage"),
	generateStages: jasmine.createSpy("generateStages"),
	updateNumberOfStages: jasmine.createSpy("updateNumberOfStages"),
	updateSelectedGames: jasmine.createSpy("updateSelectedGames"),
	updateSelectedFolders: jasmine.createSpy("updateSelectedFolders"),
	updateUserXp: jasmine.createSpy("updateUserXp"),
	cancelGame: jasmine.createSpy("cancelGame"),
});

export type IMockGameService = ReturnType<typeof createMockGameService>;
