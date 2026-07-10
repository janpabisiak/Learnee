import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FoldersSelectorComponent } from "./folders-selector.component";
import { provideTranslateService } from "@ngx-translate/core";
import { createMockFoldersService, IMockFoldersService } from "@services/folder/folders.service.mock";
import { createMockGameService, IMockGameService } from "@services/game/game.service.mock";
import { FoldersService } from "@services/folder/folders.service";
import { GameService } from "@services/game/game.service";

describe("FoldersSelectorComponent", () => {
	let component: FoldersSelectorComponent;
	let fixture: ComponentFixture<FoldersSelectorComponent>;
	let mockFoldersService: IMockFoldersService;
	let mockGameService: IMockGameService;

	beforeEach(async () => {
		mockFoldersService = createMockFoldersService();
		mockGameService = createMockGameService();

		await TestBed.configureTestingModule({
			imports: [FoldersSelectorComponent],
			providers: [
				{ provide: FoldersService, useValue: mockFoldersService },
				{ provide: GameService, useValue: mockGameService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(FoldersSelectorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
