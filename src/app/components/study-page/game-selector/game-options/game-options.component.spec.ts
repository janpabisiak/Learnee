import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GameOptionsComponent } from "./game-options.component";
import { provideTranslateService } from "@ngx-translate/core";
import { FoldersService } from "@services/folder/folders.service";
import { GameService } from "@services/game/game.service";
import { createMockFoldersService, IMockFoldersService } from "@services/folder/folders.service.mock";
import { createMockGameService, IMockGameService } from "@services/game/game.service.mock";

describe("GameOptionsComponent", () => {
	let component: GameOptionsComponent;
	let fixture: ComponentFixture<GameOptionsComponent>;
	let mockFoldersService: IMockFoldersService;
	let mockGameService: IMockGameService;

	beforeEach(async () => {
		mockFoldersService = createMockFoldersService();
		mockGameService = createMockGameService();

		await TestBed.configureTestingModule({
			imports: [GameOptionsComponent],
			providers: [
				{ provide: FoldersService, useValue: mockFoldersService },
				{ provide: GameService, useValue: mockGameService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(GameOptionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
