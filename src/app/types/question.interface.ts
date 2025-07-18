import { IAnswer } from "./answer.interface";

export interface IQuestion {
	id: number;
	content: string;
	possibleAnswers: IAnswer[];
}
