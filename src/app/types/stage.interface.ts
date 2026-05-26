import { EAvailableGames } from "@shared/constants/game.constants";

export interface IStage {
	id: number;
	type: EAvailableGames;
	data: any;
	answered: boolean;
	answeredCorrect: boolean;
}
