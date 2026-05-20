import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";
import { FoldersService } from "@services/folder/folders.service";
import {
	createMockFoldersService,
	IMockFoldersService,
} from "@services/folder/folders.service.mock";
import { EFolderSortTypes } from "@services/folders-options/folders-options.service";
import { FolderListSortComponent } from "./folder-list-sort.component";

describe("FolderListSortComponent", () => {
	let component: FolderListSortComponent;
	let fixture: ComponentFixture<FolderListSortComponent>;
	let mockFoldersService: IMockFoldersService;

	beforeEach(async () => {
		mockFoldersService = createMockFoldersService();

		await TestBed.configureTestingModule({
			imports: [FolderListSortComponent],
			providers: [
				provideHttpClient(),
				{ provide: FoldersService, useValue: mockFoldersService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(FolderListSortComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
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
