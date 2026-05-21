import { Injectable } from "@angular/core";
import { IWord } from "../../types/word.interface";
import { IResultRange } from "../../types/resultRange.interface";
import { commonSortOptions } from "@shared/constants/sorting.constants";

export enum EWordSortTypes {
	IdASC = "idASC",
	IdDESC = "idDESC",
	NameASC = "nameASC",
	NameDESC = "nameDESC",
	DefinitionASC = "definitionASC",
	DefinitionDESC = "definitionDESC",
	IsLearningASC = "isLearningASC",
	IsLearningDESC = "isLearningDESC",
}

const sortOptions: Record<EWordSortTypes, (wordList: IWord[]) => IWord[]> = {
	...commonSortOptions,
	[EWordSortTypes.DefinitionASC]: (wordList) =>
		[...wordList].sort((a, b) => a.definition.localeCompare(b.definition)),
	[EWordSortTypes.DefinitionDESC]: (wordList) =>
		[...wordList].sort((a, b) => b.definition.localeCompare(a.definition)),
	[EWordSortTypes.IsLearningASC]: (wordList) =>
		[...wordList].sort((a, b) => +a.isLearning - +b.isLearning),
	[EWordSortTypes.IsLearningDESC]: (wordList) =>
		[...wordList].sort((a, b) => +b.isLearning - +a.isLearning),
};

@Injectable({
	providedIn: "root",
})
export class WordsOptionsService {
	sort(wordList: IWord[], sortType: EWordSortTypes) {
		return sortOptions[sortType](wordList);
	}

	filter(wordList: IWord[], query: string) {
		const lowerCaseQuery = query.toLowerCase();

		return wordList.filter(
			(w) =>
				w.name.toLowerCase().includes(lowerCaseQuery) ||
				w.definition.toLowerCase().includes(lowerCaseQuery),
		);
	}

	paginate(wordList: IWord[], resultRange: IResultRange) {
		return wordList.slice(resultRange.start, resultRange.end);
	}
}
