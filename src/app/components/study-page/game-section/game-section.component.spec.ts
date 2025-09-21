import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GameSectionComponent } from "./game-section.component";
import { GameContainerComponent } from "./game-container/game-container.component";
import { ButtonComponent } from "@components/utils/button/button.component";
import { StudyProgressBarComponent } from "../study-progress-bar/study-progress-bar.component";
import { createMockGameService, IMockGameService, mockStages } from "app/app.component.spec";
import { provideHttpClient } from "@angular/common/http";
import { GameService } from "@services/game.service";

describe("GameSectionComponent", () => {
	let component: GameSectionComponent;
	let fixture: ComponentFixture<GameSectionComponent>;
	let mockGameService: IMockGameService;

	beforeEach(async () => {
		mockGameService = createMockGameService();

		await TestBed.configureTestingModule({
			imports: [
				GameSectionComponent,
				GameContainerComponent,
				ButtonComponent,
				StudyProgressBarComponent,
			],
			providers: [provideHttpClient(), { provide: GameService, useValue: mockGameService }],
		}).compileComponents();

		fixture = TestBed.createComponent(GameSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should update currentStage property due to observables change", () => {
		mockGameService.stages$.next(mockStages);
		mockGameService.currentStageId$.next(1);

		expect(component.currentStage).toEqual(mockStages[1]);
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
