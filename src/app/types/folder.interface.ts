import { IEntity } from "./entity.interface";

export interface IFolder extends IEntity {
	description: string;
	wordIds: number[];
}
