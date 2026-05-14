import { Injectable } from "@angular/core";
import { IWord } from "../../types/word.interface";

export interface IResultRange {
	start: number;
	end: number;
}

export enum ESortTypes {
	NameASC = "nameASC",
	NameDESC = "nameDESC",
	DefinitionASC = "definitionASC",
	DefinitionDESC = "definitionDESC",
	IsLearningASC = "isLearningASC",
	IsLearningDESC = "isLearningDESC",
	IdASC = "idASC",
	IdDESC = "idDESC",
}

const sortOptions: Record<ESortTypes, (wordList: IWord[]) => IWord[]> = {
	[ESortTypes.NameASC]: (wordList) => [...wordList].sort((a, b) => a.name.localeCompare(b.name)),
	[ESortTypes.NameDESC]: (wordList) => [...wordList].sort((a, b) => b.name.localeCompare(a.name)),
	[ESortTypes.DefinitionASC]: (wordList) =>
		[...wordList].sort((a, b) => a.definition.localeCompare(b.definition)),
	[ESortTypes.DefinitionDESC]: (wordList) =>
		[...wordList].sort((a, b) => b.definition.localeCompare(a.definition)),
	[ESortTypes.IsLearningASC]: (wordList) =>
		[...wordList].sort((a, b) => +a.isLearning - +b.isLearning),
	[ESortTypes.IsLearningDESC]: (wordList) =>
		[...wordList].sort((a, b) => +b.isLearning - +a.isLearning),
	[ESortTypes.IdASC]: (wordList) => [...wordList].sort((a, b) => a.id - b.id),
	[ESortTypes.IdDESC]: (wordList) => [...wordList].sort((a, b) => b.id - a.id),
};

@Injectable({
	providedIn: "root",
})
export class WordsOptionsService {
	sort(wordList: IWord[], sortType: ESortTypes) {
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
