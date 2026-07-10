import { IEntity } from "./entity.interface";

export interface IWord extends IEntity {
	definition: string;
	isLearning: boolean;
	toBeAdded?: boolean;
}
