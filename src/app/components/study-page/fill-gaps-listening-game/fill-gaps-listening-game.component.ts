import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from "@angular/core";
import { EAvailableGames, GameService, IStage } from "@services/game.service";
import { combineLatest, skip, Subject, takeUntil } from "rxjs";
import { ButtonComponent } from "@components/utils/button/button.component";
import { SentenceCasePipe } from "@pipes/sentence-case.pipe";
import { NgClass } from "@angular/common";
import { InputGuessComponent } from "@components/study-page/fill-gaps-listening-game/input-guess/input-guess.component";
import { WebSpeechService } from "@services/web-speech.service";

@Component({
	selector: "app-fill-gaps-listening-game",
	imports: [ButtonComponent, SentenceCasePipe, NgClass, InputGuessComponent],
	templateUrl: "./fill-gaps-listening-game.component.html",
	styleUrls: ["./fill-gaps-listening-game.component.css"],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FillGapsGameComponent implements OnInit, OnDestroy {
	currentStageId = 0;
	data: IStage | null = null;
	wordLength = 0;
	isVisible = true;
	inputValue = "";
	EAvailableGames = EAvailableGames;
	private destroy$ = new Subject<void>();
	private keyEventHandler = (e: KeyboardEvent) => {
		if (e.key !== "Enter") return;
		this.answerQuestion();
	};

	constructor(private gameService: GameService, private webSpeechService: WebSpeechService) {}

	ngOnInit() {
		combineLatest([this.gameService.stages$, this.gameService.currentStageId$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([stages, currentStageId]) => {
				this.currentStageId = currentStageId;
				this.data = stages[currentStageId];
				this.wordLength = this.data.data.word.length;
			});

		this.gameService.currentStageId$.pipe(takeUntil(this.destroy$), skip(1)).subscribe(() => {
			this.inputValue = "";
			this.isVisible = true;
		});

		document.addEventListener("keydown", this.keyEventHandler);
	}

	updateInputValue(value: string) {
		this.inputValue = value;
	}

	readWordDefinition() {
		this.webSpeechService.readText(this.data?.data.definition);
	}

	answerQuestion() {
		if (this.data?.answered) return;

		this.isVisible = false;
		this.gameService.answerFillGapsGameQuestion(this.inputValue);
		this.inputValue = this.data?.data.word;

		this.gameService.goToNextStage();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
		document.removeEventListener("keydown", this.keyEventHandler);
	}
}
