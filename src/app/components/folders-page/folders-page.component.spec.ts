import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideTranslateService } from "@ngx-translate/core";
import { FoldersPageComponent } from "./folders-page.component";
import { FoldersService } from "@services/folder/folders.service";
import {
	createMockFoldersService,
	IMockFoldersService,
} from "@services/folder/folders.service.mock";
import { ModalService } from "@services/modal/modal.service";
import { createMockModalService, IMockModalService } from "@services/modal/modal.service.mock";
import { EModalType } from "@shared/constants/modal.constants";

describe("FoldersPageComponent", () => {
	let component: FoldersPageComponent;
	let fixture: ComponentFixture<FoldersPageComponent>;
	let mockFoldersService: IMockFoldersService;
	let mockModalService: IMockModalService;

	beforeEach(async () => {
		mockFoldersService = createMockFoldersService();
		mockModalService = createMockModalService();

		await TestBed.configureTestingModule({
			imports: [FoldersPageComponent],
			providers: [
				provideTranslateService(),
				{ provide: FoldersService, useValue: mockFoldersService },
				{ provide: ModalService, useValue: mockModalService },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(FoldersPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should call modalService.toggleModal on toggleIsAddFolderModalOpen call", () => {
		component.toggleIsAddFolderModalOpen(true);

		expect(mockModalService.toggleModal).toHaveBeenCalledOnceWith(
			EModalType.FolderEdition,
			true,
		);
	});
});
