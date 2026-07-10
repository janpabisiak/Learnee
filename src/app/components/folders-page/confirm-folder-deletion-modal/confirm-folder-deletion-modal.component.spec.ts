import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConfirmFolderDeletionModalComponent } from "./confirm-folder-deletion-modal.component";
import { provideHttpClient } from "@angular/common/http";
import { ModalComponent } from "@shared/components/modal/modal.component";
import { createMockModalService, IMockModalService } from "@services/modal/modal.service.mock";
import { ModalService } from "@services/modal/modal.service";
import { EModalType } from "@shared/constants/modal.constants";

import { FoldersService } from "@services/folder/folders.service";
import { createMockFoldersService, IMockFoldersService } from "@services/folder/folders.service.mock";
import { provideTranslateService } from "@ngx-translate/core";

describe("ConfirmFolderDeletionModalComponent", () => {
	let component: ConfirmFolderDeletionModalComponent;
	let fixture: ComponentFixture<ConfirmFolderDeletionModalComponent>;
	let mockModalService: IMockModalService;
	let mockFoldersService: IMockFoldersService;

	beforeEach(async () => {
		mockModalService = createMockModalService();
		mockFoldersService = createMockFoldersService();

		await TestBed.configureTestingModule({
			imports: [ConfirmFolderDeletionModalComponent, ModalComponent],
			providers: [
				provideHttpClient(),
				{ provide: ModalService, useValue: mockModalService },
				{ provide: FoldersService, useValue: mockFoldersService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ConfirmFolderDeletionModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should hide folder deletion modal and reset singleFolderIdToOperateOn on closeModal call", () => {
		component.closeModal();

		expect(mockModalService.toggleModal).toHaveBeenCalledOnceWith(
			EModalType.FolderDeletion,
			false,
		);
		expect(mockFoldersService.updateSingleFolderIdToOperateOn).toHaveBeenCalledOnceWith(null);
	});

	it("should call foldersService.delete on confirmDeletion call when folderId is set", () => {
		component.folderId = 1;
		component.confirmDeletion();

		expect(mockFoldersService.delete).toHaveBeenCalledOnceWith(1);
	});

	it("should call foldersService.deleteMany on confirmDeletion call when folderId is not set", () => {
		component.folderId = null;
		component.confirmDeletion();

		expect(mockFoldersService.deleteMany).toHaveBeenCalledTimes(1);
	});
});
