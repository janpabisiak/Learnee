export enum EAvailableGames {
	Quiz = "Quiz",
	MatchingGame = "Matching",
	TrueOrFalse = "True or false",
	FillGaps = "Fill gaps",
	Listening = "Listening",
}

export interface IGame {
	id: number;
	title: EAvailableGames;
	description: string;
	icon: string;
	expIfWin: number;
}

export const availableGames: IGame[] = [
	{
		id: 0,
		title: EAvailableGames.Quiz,
		description: "Select correct definition for given word",
		icon: "library-outline",
		expIfWin: 4,
	},
	{
		id: 1,
		title: EAvailableGames.MatchingGame,
		description: "Match word with its definition",
		icon: "shuffle-outline",
		expIfWin: 6,
	},
	{
		id: 2,
		title: EAvailableGames.TrueOrFalse,
		description: "Check whether word has correct definition",
		icon: "help-outline",
		expIfWin: 2,
	},
	{
		id: 3,
		title: EAvailableGames.FillGaps,
		description: "Check whether word has correct definition",
		icon: "text-outline",
		expIfWin: 4,
	},
	{
		id: 4,
		title: EAvailableGames.Listening,
		description: "Select correct word from read definition",
		icon: "volume-medium-outline",
		expIfWin: 4, // must be the same as for FillGaps game cause of the same answer reveal method
	},
];

export const STAGE_TRANSITION_DELAY = 2000;
export const XP_PENALTY_ON_LOSS = 5;
export const DEFAULT_NUMBER_OF_STAGES = 15;
export const MIN_WORDS_TO_PLAY = 4;
