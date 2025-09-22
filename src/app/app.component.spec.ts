import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { HeaderComponent } from "@components/header/header.component";
import { AddEditWordModalComponent } from "@components/home-page/add-edit-word-modal/add-edit-word-modal.component";
import { ConfirmWordDeletionModalComponent } from "@components/home-page/confirm-word-deletion-modal/confirm-word-deletion-modal.component";
import {
	EToasterPositions,
	ToasterContainerComponent,
} from "@components/utils/toaster-container/toaster-container.component";
import { SpinnerComponent } from "@components/utils/spinner/spinner.component";
import { BehaviorSubject } from "rxjs";
import { IToaster } from "./types/toaster.interface";
import { ToasterService } from "@services/toaster.service";
import { ModalService } from "@services/modal.service";
import { IWord } from "./types/word.interface";
import { WordsService } from "@services/words.service";
import { EToasterTypes } from "@components/utils/toaster-container/toaster/toaster.component";
import { IStatistics } from "@services/level.service";
import { EAvailableGames, IStage } from "@services/game.service";
import { FooterComponent } from "@components/footer/footer.component";
import { MobileMenuComponent } from "@components/header/mobile-menu/mobile-menu.component";
import { IResultRange } from "@services/pagination.service";

describe("AppComponent", () => {
	let fixture: ComponentFixture<AppComponent>;
	let app: AppComponent;
	let mockModalService: IMockModalService;
	let mockToasterService: IMockToasterService;
	let mockWordsService: IMockWordsService;

	beforeEach(async () => {
		mockModalService = createMockModalService();
		mockToasterService = createMockToasterService();
		mockWordsService = createMockWordsService();

		await TestBed.configureTestingModule({
			imports: [
				AppComponent,
				HeaderComponent,
				AddEditWordModalComponent,
				ConfirmWordDeletionModalComponent,
				ToasterContainerComponent,
				SpinnerComponent,
				MobileMenuComponent,
				FooterComponent,
			],
			providers: [
				provideHttpClient(),
				provideRouter([]),
				{ provide: ToasterService, useValue: mockToasterService },
				{ provide: ModalService, useValue: mockModalService },
				{ provide: WordsService, useValue: mockWordsService },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(AppComponent);
		app = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create the app", () => {
		expect(app).toBeTruthy();
	});

	it("should initialize default values on init", () => {
		expect(app.isWordAddingModalOpen).toBeFalse();
		expect(app.isWordDeletingModalOpen).toBeFalse();
		expect(app.isMobileNavbarOpen).toBeFalse();
		expect(app.isLoading).toBeTrue();
		expect(app.toasters).toEqual([]);
		expect(app.EToasterPositions).toEqual(EToasterPositions);
	});

	it("should start auto removing toasters on init", () => {
		expect(app.toasterService.startAutoRemoving).toHaveBeenCalledTimes(1);
	});

	it("should add subscriptions to an array", () => {
		const addSubscriptionSpy = spyOn(app["subscriptions"], "add");
		app.ngOnInit();

		expect(addSubscriptionSpy).toHaveBeenCalled();
	});

	it("should set fields values depending on subscriptions", () => {
		mockModalService.isWordAddingModalOpen$.next(true);
		mockModalService.isWordDeletionModalOpen$.next(true);
		mockModalService.isMobileNavbarOpen$.next(true);
		mockWordsService.wordsOfTheDay$.next(mockWords);
		mockToasterService.toasters$.next(mockToasters);

		app.ngOnInit();

		expect(app.isWordAddingModalOpen).toBeTrue();
		expect(app.isWordDeletingModalOpen).toBeTrue();
		expect(app.isMobileNavbarOpen).toBeTrue();
		expect(app.isLoading).toBeFalse();
		expect(app.toasters).toEqual(mockToasters);
	});

	it("should disable mobile navbar on mobile-menu-overlay click", () => {
		const htmlEl = document.createElement("div");
		htmlEl.id = "mobile-menu-overlay";
		app.onClick(htmlEl);

		expect(mockModalService.toggleIsMobileNavbarOpen).toHaveBeenCalledOnceWith(false);
	});

	it("should NOT disable mobile navbar on click outside mobile-menu-overlay", () => {
		const htmlEl = document.createElement("div");
		app.onClick(htmlEl);

		expect(mockModalService.toggleIsMobileNavbarOpen).not.toHaveBeenCalled();
	});

	it("should remove subscriptions on destroy", () => {
		const unsubscribeSpy = spyOn(app["subscriptions"], "unsubscribe");
		app.ngOnDestroy();

		expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
	});
});

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

export const mockToasters: IToaster[] = [
	{
		id: 0,
		content: "test",
		duration: 5,
		expirationTimestamp: new Date().getTime() + 5,
		type: EToasterTypes.Success,
	},
	{
		id: 1,
		content: "test_2",
		duration: 7,
		expirationTimestamp: new Date().getTime() + 7,
		type: EToasterTypes.Error,
	},
];

export const mockStatisticsMap = new Map() as Map<string, number>;
mockStatisticsMap.set("2025-09-17T00:00:00.000Z", 4);
mockStatisticsMap.set("2025-09-18T00:00:00.000Z", 3);

export const mockStatistics: IStatistics[] = [
	{
		date: "2025-09-17T00:00:00.000Z",
		numberOfPlays: 4,
	},
	{
		date: "2025-09-18T00:00:00.000Z",
		numberOfPlays: 3,
	},
];

export const mockStages: IStage[] = [
	{
		id: 0,
		type: EAvailableGames.FillGaps,
		answered: true,
		answeredCorrect: false,
		data: {},
	},
	{
		id: 1,
		type: EAvailableGames.Listening,
		answered: false,
		answeredCorrect: false,
		data: {},
	},
];

export const mockAvailableGames: EAvailableGames[] = [
	EAvailableGames.FillGaps,
	EAvailableGames.Listening,
];

export const mockSelectedGames: EAvailableGames[] = [EAvailableGames.FillGaps];

export const mockResultRange: IResultRange = {
	start: 0,
	end: 10,
};

export const createMockModalService = () => ({
	isWordAddingModalOpen$: new BehaviorSubject<boolean>(false),
	isWordDeletionModalOpen$: new BehaviorSubject<boolean>(false),
	isMobileNavbarOpen$: new BehaviorSubject<boolean>(false),
	toggleShowWordAddingModal: jasmine.createSpy("toggleShowWordAddingModal"),
	toggleShowWordDeletionModal: jasmine.createSpy("toggleShowWordDeletionModal"),
	toggleIsMobileNavbarOpen: jasmine.createSpy("toggleIsMobileNavbarOpen"),
});

export const createMockToasterService = () => ({
	toasters$: new BehaviorSubject<IToaster[]>([]),
	startAutoRemoving: jasmine.createSpy("startAutoRemoving"),
});

export const createMockWordsService = () => ({
	wordsOfTheDay$: new BehaviorSubject<IWord[]>([]),
	wordList$: new BehaviorSubject<IWord[]>([]),
	filteredWordList$: new BehaviorSubject<IWord[]>([]),
	toggleIsLearning: jasmine.createSpy("toggleIsLearning"),
	removeWord: jasmine.createSpy("removeWord"),
	purgeWordList: jasmine.createSpy("purgeWordList"),
	filterWordList: jasmine.createSpy("filterWordList"),
	sortWordList: jasmine.createSpy("sortWordList"),
});

export const createMockLevelService = () => ({
	statistics$: new BehaviorSubject<Map<string, number>>(new Map<string, number>()),
	xpPoints$: new BehaviorSubject<number>(0),
	level$: new BehaviorSubject<number>(0),
});

export const createMockAddWordFormService = () => ({
	isSubmitAttempted$: new BehaviorSubject<boolean>(false),
	isSubmitDisabled$: new BehaviorSubject<boolean>(false),
	toggleShowWordAddingModal: jasmine.createSpy("toggleShowWordAddingModal"),
	setupForEditing: jasmine.createSpy("setupForEditing"),
});

export const createMockWebSpeechService = () => ({
	readText: jasmine.createSpy("readText"),
});

export const createMockGameService = () => ({
	stages$: new BehaviorSubject<IStage[]>([]),
	currentStageId$: new BehaviorSubject<number>(0),
	selectedGames$: new BehaviorSubject<EAvailableGames[]>([]),
	answerTrueFalseGameQuestion: jasmine.createSpy("answerTrueFalseGameQuestion"),
	answerQuizQuestion: jasmine.createSpy("answerQuizQuestion"),
	answerFillGapsListeningGameQuestion: jasmine.createSpy("answerFillGapsListeningGameQuestion"),
	goToNextStage: jasmine.createSpy("goToNextStage"),
	generateStages: jasmine.createSpy("generateStages"),
	updateSelectedGames: jasmine.createSpy("updateSelectedGames"),
	cancelGame: jasmine.createSpy("cancelGame"),
});

export const createMockConfirmWordDeletionService = () => ({
	word: null as IWord | null,
	purgeWords: false,
});

export const createMockPaginationService = () => ({
	page$: new BehaviorSubject<number>(1),
	maxPage$: new BehaviorSubject<number>(1),
	wordsPerPage$: new BehaviorSubject<number>(5),
	resultRange$: new BehaviorSubject<IResultRange>(mockResultRange),
	setPage: jasmine.createSpy("setPage"),
	setWordsPerPage: jasmine.createSpy("setWordsPerPage"),
});

export type IMockModalService = ReturnType<typeof createMockModalService>;
export type IMockToasterService = ReturnType<typeof createMockToasterService>;
export type IMockWordsService = ReturnType<typeof createMockWordsService>;
export type IMockLevelService = ReturnType<typeof createMockLevelService>;
export type IMockAddWordFormService = ReturnType<typeof createMockAddWordFormService>;
export type IMockMockConfirmWordDeletionService = ReturnType<
	typeof createMockConfirmWordDeletionService
>;
export type IMockWebSpeechService = ReturnType<typeof createMockWebSpeechService>;
export type IMockGameService = ReturnType<typeof createMockGameService>;
export type IMockPaginationService = ReturnType<typeof createMockPaginationService>;
