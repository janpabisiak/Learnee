import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";
import { FoldersService } from "@services/folder/folders.service";
import {
	createMockFoldersService,
	IMockFoldersService,
} from "@services/folder/folders.service.mock";
import { FolderListSearchBarComponent } from "./folder-list-search-bar.component";

describe("FolderListSearchBarComponent", () => {
	let component: FolderListSearchBarComponent;
	let fixture: ComponentFixture<FolderListSearchBarComponent>;
	let mockFoldersService: IMockFoldersService;

	beforeEach(async () => {
		mockFoldersService = createMockFoldersService();

		await TestBed.configureTestingModule({
			imports: [FolderListSearchBarComponent],
			providers: [
				provideHttpClient(),
				{ provide: FoldersService, useValue: mockFoldersService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(FolderListSearchBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should call foldersService.setSearchQuery on search method call", () => {
		const inputElement = document.createElement("input");
		inputElement.value = "test";
		component.search(inputElement);

		expect(mockFoldersService.setSearchQuery).toHaveBeenCalledOnceWith("test");
	});
});
