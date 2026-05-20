import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideTranslateService } from "@ngx-translate/core";
import { FoldersService } from "@services/folder/folders.service";
import {
	createMockFoldersService,
	IMockFoldersService,
} from "@services/folder/folders.service.mock";
import { FolderListSelectionControlButtonsComponent } from "./folder-list-selection-control-buttons.component";

describe("FolderListSelectionControlButtonsComponent", () => {
	let component: FolderListSelectionControlButtonsComponent;
	let fixture: ComponentFixture<FolderListSelectionControlButtonsComponent>;
	let mockFoldersService: IMockFoldersService;

	beforeEach(async () => {
		mockFoldersService = createMockFoldersService();

		await TestBed.configureTestingModule({
			imports: [FolderListSelectionControlButtonsComponent],
			providers: [
				{ provide: FoldersService, useValue: mockFoldersService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(FolderListSelectionControlButtonsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
