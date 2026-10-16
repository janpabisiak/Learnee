import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";
import { ButtonComponent } from "@shared/components/button/button.component";
import { DraggableItemsListComponent } from "./draggable-items-list/draggable-items-list.component";
import { MatchingGameComponent } from "./matching-game.component";

import { GameService } from "@services/game/game.service";
import { createMockGameService, IMockGameService } from "@services/game/game.service.mock";

describe("MatchingGameComponent", () => {
	let component: MatchingGameComponent;
	let fixture: ComponentFixture<MatchingGameComponent>;
	let mockGameService: IMockGameService;

	beforeEach(async () => {
		mockGameService = createMockGameService();

		await TestBed.configureTestingModule({
			imports: [MatchingGameComponent, DraggableItemsListComponent, ButtonComponent],
			providers: [
				provideHttpClient(),
				provideTranslateService({
					fallbackLang: "en",
				}),
				{ provide: GameService, useValue: mockGameService },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(MatchingGameComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should call submitAnswer on checkAnswers call without going to the next stage", () => {
		component.terms = ["term1"];
		component.definitions = ["def1"];
		mockGameService.submitAnswer.and.returnValue([true]);

		component.checkAnswers();

		expect(mockGameService.submitAnswer).toHaveBeenCalledOnceWith({
			terms: ["term1"],
			definitions: ["def1"],
		});
		expect(mockGameService.goToNextStage).not.toHaveBeenCalled();
		expect(component.answered).toBeTrue();
		expect(component.isVisible).toBeFalse();
	});

	it("should not call submitAnswer on checkAnswers when already answered", () => {
		component.answered = true;
		component.checkAnswers();

		expect(mockGameService.submitAnswer).not.toHaveBeenCalled();
	});

	it("should call gameService.goToNextStage on nextStage call", () => {
		component.isVisible = true;
		component.nextStage();

		expect(component.isVisible).toBeFalse();
		expect(mockGameService.goToNextStage).toHaveBeenCalledTimes(1);
	});

	it("should remove subscription on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");

		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
