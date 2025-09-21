import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { SectionTitleComponent } from "@components/utils/section-title/section-title.component";
import { GameService } from "@services/game.service";
import { createMockGameService, IMockGameService, mockStages } from "app/app.component.spec";
import { GameContainerComponent } from "../game-section/game-container/game-container.component";
import { GameResultsComponent } from "./game-results.component";

describe("GameResultsComponent", () => {
	let component: GameResultsComponent;
	let fixture: ComponentFixture<GameResultsComponent>;
	let mockGameService: IMockGameService;

	beforeEach(async () => {
		mockGameService = createMockGameService();

		await TestBed.configureTestingModule({
			imports: [GameResultsComponent, SectionTitleComponent, GameContainerComponent],
			providers: [provideHttpClient(), { provide: GameService, useValue: mockGameService }],
		}).compileComponents();

		fixture = TestBed.createComponent(GameResultsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should update stages property on subject change", () => {
		mockGameService.stages$.next(mockStages);

		expect(component.stages).toEqual(mockStages);
	});

	it("should call gameService.cancelGame on cancelGame call", () => {
		component.cancelGame();

		expect(mockGameService.cancelGame).toHaveBeenCalledTimes(1);
	});

	it("should remove subscription on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");

		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
