import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnDestroy, OnInit } from "@angular/core";
import { EAvailableGames, GameService, IStage } from "@services/game.service";
import { combineLatest, skip, Subject, takeUntil } from "rxjs";
import { ButtonComponent } from "@components/utils/button/button.component";
import { SentenceCasePipe } from "@pipes/sentence-case.pipe";
import { NgClass, NgIf } from "@angular/common";
import { InputGuessComponent } from "@components/study-page/fill-gaps-listening-game/input-guess/input-guess.component";
import { WebSpeechService } from "@services/web-speech.service";

@Component({
	selector: "app-fill-gaps-listening-game",
	imports: [ButtonComponent, SentenceCasePipe, NgClass, InputGuessComponent, NgIf],
	templateUrl: "./fill-gaps-listening-game.component.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FillGapsGameComponent implements OnInit, OnDestroy {
	@Input() stage: IStage | null = null;
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
		if (this.stage) {
			this.currentStageId = this.stage.id;
			this.data = this.stage;
			this.inputValue = this.data.data.word;
			this.wordLength = this.stage.data.word.length;

			return;
		}

		combineLatest([this.gameService.stages$, this.gameService.currentStageId$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([stages, currentStageId]) => {
				if (!stages || !stages[currentStageId]) return;

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
		this.gameService.answerFillGapsListeningGameQuestion(this.inputValue);
		this.inputValue = this.data?.data.word;

		this.gameService.goToNextStage();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
		document.removeEventListener("keydown", this.keyEventHandler);
	}
}
