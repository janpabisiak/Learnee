import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideTranslateService } from "@ngx-translate/core";
import { FoldersService } from "@services/folder/folders.service";
import {
	createMockFoldersService,
	IMockFoldersService,
	mockFolders,
} from "@services/folder/folders.service.mock";
import { ModalService } from "@services/modal/modal.service";
import { createMockModalService, IMockModalService } from "@services/modal/modal.service.mock";
import { WordsOptionsService } from "@services/words-options/words-options.service";
import {
	createMockWordsOptionsService,
	IMockWordsOptionsService,
} from "@services/words-options/words-options.service.mock";
import { WordsService } from "@services/words/words.service";
import {
	createMockWordsService,
	IMockWordsService,
	mockWords,
} from "@services/words/words.service.mock";
import { EModalType } from "@shared/constants/modal.constants";
import { AddToFolderModalComponent } from "./add-to-folder-modal.component";

describe("AddToFolderModalComponent", () => {
	let component: AddToFolderModalComponent;
	let fixture: ComponentFixture<AddToFolderModalComponent>;
	let mockModalService: IMockModalService;
	let mockWordsService: IMockWordsService;
	let mockFoldersService: IMockFoldersService;
	let mockWordsOptionsService: IMockWordsOptionsService;

	beforeEach(async () => {
		mockModalService = createMockModalService();
		mockWordsService = createMockWordsService();
		mockFoldersService = createMockFoldersService();
		mockWordsOptionsService = createMockWordsOptionsService();

		await TestBed.configureTestingModule({
			imports: [AddToFolderModalComponent],
			providers: [
				{ provide: ModalService, useValue: mockModalService },
				{ provide: WordsService, useValue: mockWordsService },
				{ provide: FoldersService, useValue: mockFoldersService },
				{ provide: WordsOptionsService, useValue: mockWordsOptionsService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(AddToFolderModalComponent);
		component = fixture.componentInstance;
	});

	it("should create", () => {
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it("should initialize wordList and folderId from services", () => {
		mockWordsService.wordList$.next(mockWords);
		mockFoldersService.singleFolderIdToOperateOn$.next(1);
		mockFoldersService.folders$.next(mockFolders);

		fixture.detectChanges();

		expect(component.wordList).toEqual(mockWords);
		expect(component.folderId).toBe(1);
		expect(component.selectedWordIds).toEqual(mockFolders[1].wordIds);
	});

	it("should toggle word selection", () => {
		fixture.detectChanges();
		component.selectedWordIds = [1];
		component.toggleSelection(2);
		expect(component.selectedWordIds).toContain(2);
		expect(component.selectedWordIds).toContain(1);

		component.toggleSelection(1);
		expect(component.selectedWordIds).not.toContain(1);
		expect(component.selectedWordIds).toContain(2);
	});

	it("should call modifyFolderWordIds and closeModal on selectWordsForFolder call", () => {
		fixture.detectChanges();
		component.selectedWordIds = [1, 2];
		component.selectWordsForFolder();

		expect(mockFoldersService.modifyFolderWordIds).toHaveBeenCalledOnceWith([1, 2]);
		expect(mockModalService.toggleModal).toHaveBeenCalledOnceWith(
			EModalType.AddToFolder,
			false,
		);
	});

	it("should close modal", () => {
		fixture.detectChanges();
		component.closeModal();
		expect(mockModalService.toggleModal).toHaveBeenCalledOnceWith(
			EModalType.AddToFolder,
			false,
		);
	});

	it("should initialize filteredWords with full word list", () => {
		mockWordsService.wordList$.next(mockWords);
		fixture.detectChanges();

		expect(component.filteredWords).toEqual(mockWords);
	});

	it("should filter words when search is called", () => {
		mockWordsService.wordList$.next(mockWords);
		fixture.detectChanges();

		component.search("test_name_2");
		expect(component.filteredWords.length).toBe(1);
		expect(component.filteredWords[0].name).toBe("test_name_2");

		component.search("nonexistent");
		expect(component.filteredWords.length).toBe(0);

		component.search("");
		expect(component.filteredWords.length).toBe(mockWords.length);
	});

	it("should destroy subscription on destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");

		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
