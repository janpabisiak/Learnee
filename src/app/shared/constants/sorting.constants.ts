import { IEntity } from "../../types/entity.interface";

export enum ECommonSortTypes {
	IdASC = "idASC",
	IdDESC = "idDESC",
	NameASC = "nameASC",
	NameDESC = "nameDESC",
}

export const commonSortOptions: Record<
	ECommonSortTypes,
	<T extends IEntity>(entities: T[]) => T[]
> = {
	[ECommonSortTypes.IdASC]: (entities) => [...entities].sort((a, b) => a.id - b.id),
	[ECommonSortTypes.IdDESC]: (entities) => [...entities].sort((a, b) => b.id - a.id),
	[ECommonSortTypes.NameASC]: (entities) =>
		[...entities].sort((a, b) => a.name.localeCompare(b.name)),
	[ECommonSortTypes.NameDESC]: (entities) =>
		[...entities].sort((a, b) => b.name.localeCompare(a.name)),
};

export const commonSortOptionsTranslationKeys: Record<ECommonSortTypes, string> = {
	[ECommonSortTypes.IdASC]: "itemlist.sort.idAsc",
	[ECommonSortTypes.IdDESC]: "itemlist.sort.idDesc",
	[ECommonSortTypes.NameASC]: "itemlist.sort.nameAsc",
	[ECommonSortTypes.NameDESC]: "itemlist.sort.nameDesc",
};
