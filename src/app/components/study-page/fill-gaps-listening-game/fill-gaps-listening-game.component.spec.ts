import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FillGapsGameComponent } from "./fill-gaps-listening-game.component";
import { provideHttpClient } from "@angular/common/http";
import { SentenceCasePipe } from "@pipes/sentence-case.pipe";
import { InputGuessComponent } from "./input-guess/input-guess.component";
import { ButtonComponent } from "@components/utils/button/button.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
	createMockGameService,
	createMockWebSpeechService,
	IMockGameService,
	IMockWebSpeechService,
	mockStages,
} from "app/app.component.spec";
import { WebSpeechService } from "@services/web-speech.service";
import { GameService } from "@services/game.service";

describe("FillGapsGameComponent", () => {
	let component: FillGapsGameComponent;
	let fixture: ComponentFixture<FillGapsGameComponent>;
	let mockWebSpeechService: IMockWebSpeechService;
	let mockGameService: IMockGameService;

	beforeEach(async () => {
		mockWebSpeechService = createMockWebSpeechService();
		mockGameService = createMockGameService();

		await TestBed.configureTestingModule({
			imports: [
				FillGapsGameComponent,
				SentenceCasePipe,
				InputGuessComponent,
				ButtonComponent,
			],
			providers: [
				provideHttpClient(),
				{ provide: WebSpeechService, useValue: mockWebSpeechService },
				{ provide: GameService, useValue: mockGameService },
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(FillGapsGameComponent);
		component = fixture.componentInstance;
		component.data = {
			...mockStages[1],
			data: {
				definition: "test",
				word: "test2",
			},
		};
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should set inputValue on updateInputValue call", () => {
		component.updateInputValue("test");

		expect(component.inputValue).toBe("test");
	});

	it("should call webSpeechService.readText on readWordDefinition call", () => {
		component.data = {
			...mockStages[1],
			data: {
				definition: "test",
				word: "test2",
			},
		};
		component.readWordDefinition();

		expect(mockWebSpeechService.readText).toHaveBeenCalledOnceWith("test");
	});

	it("should update properties and call gameService methods on answerQuestion call", () => {
		component.data = {
			...mockStages[1],
			data: {
				definition: "test",
				word: "test2",
			},
		};
		component.answerQuestion();

		expect(component.isVisible).toBeFalse();
		expect(mockGameService.answerFillGapsListeningGameQuestion).toHaveBeenCalledOnceWith("");
		expect(component.inputValue).toBe("test2");
		expect(mockGameService.goToNextStage).toHaveBeenCalledTimes(1);
	});

	it("should return void on answerQuestion call when the stage is answered", () => {
		component.data = mockStages[0];
		const result = component.answerQuestion();

		expect(result).toBeUndefined();
	});

	it("should call answerQuestion when Enter key is pressed", () => {
		spyOn(component, "answerQuestion");
		const event = new KeyboardEvent("keydown", { key: "Enter" });

		document.dispatchEvent(event);

		expect(component.answerQuestion).toHaveBeenCalled();
	});

	it("should NOT call answerQuestion for keys other than Enter", () => {
		spyOn(component, "answerQuestion");
		const event = new KeyboardEvent("keydown", { key: "a" });

		document.dispatchEvent(event);

		expect(component.answerQuestion).not.toHaveBeenCalled();
	});

	it("should remove subscriptions on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");

		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});

	it("should remove keydown event listener on destroy", () => {
		spyOn(document, "removeEventListener");
		component.ngOnDestroy();
		expect(document.removeEventListener).toHaveBeenCalledWith("keydown", jasmine.any(Function));
	});
});
