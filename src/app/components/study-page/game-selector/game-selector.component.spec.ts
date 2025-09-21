import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GameSelectorComponent } from "./game-selector.component";
import { provideHttpClient } from "@angular/common/http";
import { GameSelectorItemComponent } from "./game-selector-item/game-selector-item.component";
import {
	createMockGameService,
	IMockGameService,
	mockAvailableGames,
	mockSelectedGames,
} from "app/app.component.spec";
import { EAvailableGames, GameService } from "@services/game.service";
import { SectionTitleComponent } from "@components/utils/section-title/section-title.component";

describe("GameSelectorComponent", () => {
	let component: GameSelectorComponent;
	let fixture: ComponentFixture<GameSelectorComponent>;
	let mockGameService: IMockGameService;

	beforeEach(async () => {
		mockGameService = createMockGameService();

		await TestBed.configureTestingModule({
			imports: [GameSelectorComponent, GameSelectorItemComponent, SectionTitleComponent],
			providers: [provideHttpClient(), { provide: GameService, useValue: mockGameService }],
		}).compileComponents();

		fixture = TestBed.createComponent(GameSelectorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should set properties depending on selectedGames$ subscription", () => {
		mockGameService.selectedGames$.next(mockSelectedGames);

		expect(component.selectedGames).toEqual(mockSelectedGames);
		expect(component.allGamesSelected).toBeFalse();
	});

	it('should select all games when "all" is passed and none are selected', () => {
		component.toggleGameSelection("all");

		expect(mockGameService.updateSelectedGames).toHaveBeenCalledWith(
			Object.values(EAvailableGames)
		);
	});

	it('should deselect all games when "all" is passed and all are selected', () => {
		component.selectedGames = mockAvailableGames;
		component.allGamesSelected = true;
		component.toggleGameSelection("all");

		expect(mockGameService.updateSelectedGames).toHaveBeenCalledWith([]);
	});

	it("should add a game if it is not selected", () => {
		component.selectedGames = mockSelectedGames;
		component.toggleGameSelection(mockAvailableGames[1]);

		expect(mockGameService.updateSelectedGames).toHaveBeenCalledWith([
			...mockSelectedGames,
			mockAvailableGames[1],
		]);
	});

	it("should remove a game if it is already selected", () => {
		component.selectedGames = [mockAvailableGames[0]];
		component.toggleGameSelection(mockAvailableGames[0]);

		expect(mockGameService.updateSelectedGames).toHaveBeenCalledWith([]);
	});

	it("should not break when deselecting from an empty list", () => {
		component.selectedGames = [];
		component.toggleGameSelection(mockAvailableGames[0]);

		expect(mockGameService.updateSelectedGames).toHaveBeenCalledWith([mockAvailableGames[0]]);
	});

	it("should call gameService.generateStages on startGame call", () => {
		component.startGame();

		expect(mockGameService.generateStages).toHaveBeenCalledTimes(1);
	});

	it("should remove subscription on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");

		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
