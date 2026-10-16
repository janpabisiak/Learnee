import { NgClass, NgIf } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnDestroy, OnInit } from "@angular/core";
import { InputGuessComponent } from "@components/study-page/fill-gaps-listening-game/input-guess/input-guess.component";
import { TranslatePipe } from "@ngx-translate/core";
import { SentenceCasePipe } from "@pipes/sentence-case.pipe";
import { GameService } from "@services/game/game.service";
import { WebSpeechService } from "@services/web-speech/web-speech.service";
import { ButtonComponent } from "@shared/components/button/button.component";
import { EAvailableGames } from "@shared/constants/game.constants";
import { combineLatest, skip, Subject, takeUntil } from "rxjs";
import { IStage } from "../../../types/stage.interface";

@Component({
	selector: "app-fill-gaps-listening-game",
	imports: [ButtonComponent, SentenceCasePipe, NgClass, InputGuessComponent, NgIf, TranslatePipe],
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
	isLastStage = false;
	EAvailableGames = EAvailableGames;
	private destroy$ = new Subject<void>();
	private keyEventHandler = (e: KeyboardEvent) => {
		if (e.key !== "Enter") return;

		if (this.data?.answered) {
			this.nextStage();
		} else {
			this.answerQuestion();
		}
	};

	constructor(
		private gameService: GameService,
		private webSpeechService: WebSpeechService,
	) {}

	ngOnInit() {
		if (this.stage) {
			this.currentStageId = this.stage.id;
			this.data = this.stage;
			this.inputValue = this.data.data.word.trim();
			this.wordLength = this.stage.data.word.trim().length;

			return;
		}

		combineLatest([this.gameService.stages$, this.gameService.currentStageId$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([stages, currentStageId]) => {
				if (!stages || !stages[currentStageId]) return;

				this.currentStageId = currentStageId;
				this.data = stages[currentStageId];
				this.wordLength = this.data.data.word.trim().length;
				this.isLastStage = currentStageId === stages.length - 1;
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
		this.gameService.submitAnswer(this.inputValue.trim());
		this.inputValue = this.data?.data.word.trim();
	}

	nextStage() {
		this.isVisible = false;
		this.gameService.goToNextStage();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
		document.removeEventListener("keydown", this.keyEventHandler);
	}
}
