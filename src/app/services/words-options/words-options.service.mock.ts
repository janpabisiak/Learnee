import { IWord } from "../../types/word.interface";
import { ESortTypes, IResultRange } from "./words-options.service";

export const createMockWordsOptionsService = () => ({
	sort: jasmine.createSpy("sort").and.callFake((wordList: IWord[], _sortType: ESortTypes) => wordList),
	filter: jasmine.createSpy("filter").and.callFake((wordList: IWord[], _query: string) => wordList),
	paginate: jasmine.createSpy("paginate").and.callFake((wordList: IWord[], _resultRange: IResultRange) => wordList),
});

export type IMockWordsOptionsService = ReturnType<typeof createMockWordsOptionsService>;
