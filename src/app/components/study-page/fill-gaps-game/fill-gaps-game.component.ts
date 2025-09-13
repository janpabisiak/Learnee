import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { GameService, IStage } from "@services/game.service";
import { combineLatest, skip, Subject, takeUntil } from "rxjs";
import { ButtonComponent } from "@components/utils/button/button.component";
import { SentenceCasePipe } from "@pipes/sentence-case.pipe";
import { NgClass } from "@angular/common";

@Component({
	selector: "app-fill-gaps-game",
	imports: [ButtonComponent, SentenceCasePipe, NgClass],
	templateUrl: "./fill-gaps-game.component.html",
	styleUrls: ["./fill-gaps-game.component.css"],
})
export class FillGapsGameComponent implements OnInit, OnDestroy {
	@ViewChild("answerInput") answerInputEl!: ElementRef<HTMLInputElement>;
	currentStageId = 0;
	data: IStage | null = null;
	wordLength = 0;
	isVisible = true;
	private destroy$ = new Subject<void>();
	private keyEventHandler = (e: KeyboardEvent) => {
		if (e.key !== "Enter") return;
		this.answerQuestion();
	};

	constructor(private gameService: GameService) {}

	ngOnInit() {
		combineLatest([this.gameService.stages$, this.gameService.currentStageId$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([stages, currentStageId]) => {
				this.currentStageId = currentStageId;
				this.data = stages[currentStageId];
				this.wordLength = this.data.data.word.length;

				this.answerInputEl.nativeElement.focus();
			});

		this.gameService.currentStageId$.pipe(takeUntil(this.destroy$), skip(1)).subscribe(() => {
			this.answerInputEl.nativeElement.value = "";
			this.isVisible = true;
		});

		document.addEventListener("keydown", this.keyEventHandler);
	}

	answerQuestion() {
		if (this.data?.answered) return;

		const answer = this.answerInputEl.nativeElement.value;
		this.isVisible = false;

		this.gameService.answerFillGapsGameQuestion(answer);
		this.answerInputEl.nativeElement.value = this.data?.data.word;

		this.gameService.goToNextStage();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
		document.removeEventListener("keydown", this.keyEventHandler);
	}
}
