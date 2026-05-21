import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideTranslateService } from "@ngx-translate/core";
import { FoldersService } from "@services/folder/folders.service";
import {
	createMockFoldersService,
	IMockFoldersService,
} from "@services/folder/folders.service.mock";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { createMockModalService, IMockModalService } from "@services/modal/modal.service.mock";
import { ButtonComponent } from "@shared/components/button/button.component";
import { FolderListPurgerComponent } from "./folder-list-purger.component";

describe("FolderListPurgerComponent", () => {
	let component: FolderListPurgerComponent;
	let fixture: ComponentFixture<FolderListPurgerComponent>;
	let mockModalService: IMockModalService;
	let mockFoldersService: IMockFoldersService;

	beforeEach(async () => {
		mockModalService = createMockModalService();
		mockFoldersService = createMockFoldersService();

		await TestBed.configureTestingModule({
			imports: [FolderListPurgerComponent, ButtonComponent],
			providers: [
				{ provide: ModalService, useValue: mockModalService },
				{ provide: FoldersService, useValue: mockFoldersService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(FolderListPurgerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should show folder deletion modal and set purgeFolders on openModal call", () => {
		component.openModal();

		expect(mockModalService.toggleModal).toHaveBeenCalledOnceWith(
			EModalType.FolderDeletion,
			true,
		);
	});
});
