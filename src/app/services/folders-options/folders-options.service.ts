import { Injectable } from "@angular/core";
import { IFolder } from "../../types/folder.interface";
import { IResultRange } from "../../types/resultRange.interface";
import { commonSortOptions } from "@shared/constants/sorting.constants";

export enum EFolderSortTypes {
	IdASC = "idASC",
	IdDESC = "idDESC",
	NameASC = "nameASC",
	NameDESC = "nameDESC",
	DescriptionASC = "descriptionASC",
	DescriptionDESC = "descriptionDESC",
}

const sortOptions: Record<EFolderSortTypes, (folderList: IFolder[]) => IFolder[]> = {
	...commonSortOptions,
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
