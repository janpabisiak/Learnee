import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";
import { FoldersService } from "@services/folder/folders.service";
import {
	createMockFoldersService,
	IMockFoldersService,
} from "@services/folder/folders.service.mock";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { createMockModalService, IMockModalService } from "@services/modal/modal.service.mock";
import { ItemsPurgerComponent } from "@shared/components/items-purger/items-purger.component";
import { ItemsSelectionControlButtonsComponent } from "@shared/components/items-selection-control-buttons/items-selection-control-buttons.component";
import { ItemsSortComponent } from "@shared/components/items-sort/items-sort.component";
import { SearchBarComponent } from "@shared/components/search-bar/search-bar.component";
import { FolderListOptionsComponent } from "./folder-list-options.component";
import { EFolderSortTypes } from "@services/folders-options/folders-options.service";

describe("FolderListOptionsComponent", () => {
	let component: FolderListOptionsComponent;
	let fixture: ComponentFixture<FolderListOptionsComponent>;
	let mockModalService: IMockModalService;
	let mockFoldersService: IMockFoldersService;

	beforeEach(async () => {
		mockModalService = createMockModalService();
		mockFoldersService = createMockFoldersService();

		await TestBed.configureTestingModule({
			imports: [
				FolderListOptionsComponent,
				SearchBarComponent,
				ItemsPurgerComponent,
				ItemsSelectionControlButtonsComponent,
				ItemsSortComponent,
			],
			providers: [
				provideHttpClient(),
				{ provide: ModalService, useValue: mockModalService },
				{ provide: FoldersService, useValue: mockFoldersService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(FolderListOptionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should show folder deletion modal and set purgeFolders on openModal call", () => {
		component.openDeletionModal();

		expect(mockModalService.toggleModal).toHaveBeenCalledOnceWith(
			EModalType.FolderDeletion,
			true,
		);
	});

	it("should call foldersService.setSearchQuery on search method call", () => {
		component.search("test");

		expect(mockFoldersService.setSearchQuery).toHaveBeenCalledOnceWith("test");
	});

	it("should call foldersService.setSortType on changeSortType call", () => {
		const selectElement = document.createElement("select");
		selectElement.value = EFolderSortTypes.NameASC;
		component.changeSortType(selectElement.value);

		expect(mockFoldersService.setSortType).toHaveBeenCalledOnceWith(
			selectElement.value as EFolderSortTypes,
		);
	});

	it("should destroy subscription on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");
		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
