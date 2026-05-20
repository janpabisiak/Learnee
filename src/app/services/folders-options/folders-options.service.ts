import { Injectable } from "@angular/core";
import { IFolder } from "../../types/folder.interface";
import { IResultRange } from "../../types/resultRange.interface";

export enum EFolderSortTypes {
	IdASC = "idASC",
	IdDESC = "idDESC",
	NameASC = "nameASC",
	NameDESC = "nameDESC",
	DescriptionASC = "descriptionASC",
	DescriptionDESC = "descriptionDESC",
}

const sortOptions: Record<EFolderSortTypes, (folderList: IFolder[]) => IFolder[]> = {
	[EFolderSortTypes.IdASC]: (folderList) => [...folderList].sort((a, b) => a.id - b.id),
	[EFolderSortTypes.IdDESC]: (folderList) => [...folderList].sort((a, b) => b.id - a.id),
	[EFolderSortTypes.NameASC]: (folderList) =>
		[...folderList].sort((a, b) => a.name.localeCompare(b.name)),
	[EFolderSortTypes.NameDESC]: (folderList) =>
		[...folderList].sort((a, b) => b.name.localeCompare(a.name)),
	[EFolderSortTypes.DescriptionASC]: (folderList) =>
		[...folderList].sort((a, b) => a.description.localeCompare(b.description)),
	[EFolderSortTypes.DescriptionDESC]: (folderList) =>
		[...folderList].sort((a, b) => b.description.localeCompare(a.description)),
};

@Injectable({
	providedIn: "root",
})
export class FoldersOptionsService {
	sort(folderList: IFolder[], sortType: EFolderSortTypes) {
		return sortOptions[sortType](folderList);
	}

	filter(folderList: IFolder[], query: string) {
		const lowerCaseQuery = query.toLowerCase();

		return folderList.filter(
			(f) =>
				f.name.toLowerCase().includes(lowerCaseQuery) ||
				f.description.toLowerCase().includes(lowerCaseQuery),
		);
	}

	paginate(folderList: IFolder[], resultRange: IResultRange) {
		return folderList.slice(resultRange.start, resultRange.end);
	}
}
