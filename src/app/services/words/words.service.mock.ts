import { BehaviorSubject } from "rxjs";
import { IWord } from "../../types/word.interface";
import { ESortTypes, IResultRange } from "@services/words-options/words-options.service";

export const mockWords: IWord[] = [
	{
		id: 0,
		name: "test_name",
		definition: "test_definition",
		isLearning: true,
	},
	{
		id: 1,
		name: "test_name_2",
		definition: "test_definition_2",
		isLearning: false,
	},
];

export const mockResultRange: IResultRange = {
	start: 0,
	end: 10,
};

export const createMockWordsService = () => ({
	wordList$: new BehaviorSubject<IWord[]>([]),
	numberOfWords$: new BehaviorSubject<number>(0),
	numberOfFilteredWords$: new BehaviorSubject<number>(0),
	selectedIds$: new BehaviorSubject<number[]>([]),
	hasSelectedIds$: new BehaviorSubject<boolean>(false),
	wordToDeleteId$: new BehaviorSubject<number | null>(null),
	wordsOfTheDay$: new BehaviorSubject<IWord[]>([]),
	sortType$: new BehaviorSubject<ESortTypes>(ESortTypes.IdDESC),
	searchQuery$: new BehaviorSubject<string>(""),
	visibleWords$: new BehaviorSubject<IWord[]>([]),
	page$: new BehaviorSubject<number>(1),
	maxPage$: new BehaviorSubject<number>(1),
	wordsPerPage$: new BehaviorSubject<number>(10),
	resultRange$: new BehaviorSubject<IResultRange>(mockResultRange),
	setSortType: jasmine.createSpy("setSortType"),
	setSearchQuery: jasmine.createSpy("setSearchQuery"),
	setPage: jasmine.createSpy("setPage"),
	setWordsPerPage: jasmine.createSpy("setWordsPerPage"),
	fetchDefinition$: jasmine.createSpy("fetchDefinition$"),
	add: jasmine.createSpy("add"),
	getRandomLearningWord: jasmine.createSpy("getRandomLearningWord"),
	remove: jasmine.createSpy("remove"),
	removeMany: jasmine.createSpy("removeMany"),
	edit: jasmine.createSpy("edit"),
	updateWordToDeleteId: jasmine.createSpy("updateWordToDeleteId"),
	toggleIsLearning: jasmine.createSpy("toggleIsLearning"),
	toggleSelection: jasmine.createSpy("toggleSelection"),
	unselectAll: jasmine.createSpy("unselectAll"),
});

export type IMockWordsService = ReturnType<typeof createMockWordsService>;
