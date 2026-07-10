import { IResultRange } from "../../types/resultRange.interface";
import { IWord } from "../../types/word.interface";
import { EWordSortTypes } from "./words-options.service";

export const createMockWordsOptionsService = () => ({
	sort: jasmine
		.createSpy("sort")
		.and.callFake((wordList: IWord[], _sortType: EWordSortTypes) => wordList),
	filter: jasmine
		.createSpy("filter")
		.and.callFake((wordList: IWord[], _query: string) => wordList),
	paginate: jasmine
		.createSpy("paginate")
		.and.callFake((wordList: IWord[], _resultRange: IResultRange) => wordList),
});

export type IMockWordsOptionsService = ReturnType<typeof createMockWordsOptionsService>;
