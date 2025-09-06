import { IAnswer } from "./answer.interface";

export interface IQuestion {
	content: string;
	possibleAnswers: IAnswer[];
	answered: boolean;
	answeredCorrect: boolean;
}
