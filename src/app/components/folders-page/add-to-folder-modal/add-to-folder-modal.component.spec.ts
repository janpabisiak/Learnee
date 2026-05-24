import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddToFolderModalComponent } from "./add-to-folder-modal.component";
import { ModalService } from "@services/modal/modal.service";
import { createMockModalService, IMockModalService } from "@services/modal/modal.service.mock";
import { WordsService } from "@services/words/words.service";
import { createMockWordsService, IMockWordsService } from "@services/words/words.service.mock";
import { FoldersService } from "@services/folder/folders.service";
import { createMockFoldersService, IMockFoldersService } from "@services/folder/folders.service.mock";
import { provideTranslateService } from "@ngx-translate/core";
import { EModalType } from "@shared/constants/modal.constants";
import { mockFolders } from "@services/folder/folders.service.mock";
import { mockWords } from "@services/words/words.service.mock";

describe("AddToFolderModalComponent", () => {
	let component: AddToFolderModalComponent;
	let fixture: ComponentFixture<AddToFolderModalComponent>;
	let mockModalService: IMockModalService;
	let mockWordsService: IMockWordsService;
	let mockFoldersService: IMockFoldersService;

	beforeEach(async () => {
		mockModalService = createMockModalService();
		mockWordsService = createMockWordsService();
		mockFoldersService = createMockFoldersService();

		await TestBed.configureTestingModule({
			imports: [AddToFolderModalComponent],
			providers: [
				{ provide: ModalService, useValue: mockModalService },
				{ provide: WordsService, useValue: mockWordsService },
				{ provide: FoldersService, useValue: mockFoldersService },
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
		expect(mockModalService.toggleModal).toHaveBeenCalledOnceWith(EModalType.AddToFolder, false);
	});

	it("should close modal", () => {
		fixture.detectChanges();
		component.closeModal();
		expect(mockModalService.toggleModal).toHaveBeenCalledOnceWith(EModalType.AddToFolder, false);
	});
});
