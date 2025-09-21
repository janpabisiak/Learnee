import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { NgClass, NgIf } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnDestroy, OnInit } from "@angular/core";
import { ButtonComponent } from "@components/utils/button/button.component";
import { GameService, IStage } from "@services/game.service";
import { IMatch } from "@services/matching-game.service";
import { combineLatest, Subject, takeUntil } from "rxjs";
import { DraggableItemsListComponent } from "./draggable-items-list/draggable-items-list.component";

@Component({
	selector: "app-matching-game",
	imports: [ButtonComponent, NgClass, DraggableItemsListComponent, NgIf],
	templateUrl: "./matching-game.component.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MatchingGameComponent implements OnInit, OnDestroy {
	@Input() stage: IStage | null = null;
	private destroy$ = new Subject<void>();
	currentStageId = 0;
	matches: IMatch[] | null = null;
	terms: string[] = [];
	definitions: string[] = [];
	results: boolean[] = [];
	isVisible = false;
	answered = false;

	constructor(private gameService: GameService) {}

	ngOnInit() {
		if (this.stage) this.initFromInput();
		else this.initSubscriptions();
	}

	private initFromInput() {
		const data = this.stage!.data;

		this.currentStageId = this.stage!.id;
		this.terms = data.map((match: IMatch) => match.term);
		this.definitions = data.map((match: IMatch) => match.definition);
		this.answered = this.stage!.answered;
		this.results = Array(data.length).fill(true);
	}

	private initSubscriptions() {
		combineLatest([this.gameService.stages$, this.gameService.currentStageId$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([stages, currentId]) => {
				if (!stages || !stages[currentId]) return;

				this.currentStageId = currentId;
				this.matches = stages[currentId].data;
				this.answered = stages[currentId].answered;

				if (!this.matches) return;

				if (!this.answered) {
					this.terms = this.matches.map((m) => m.term).sort(() => Math.random() - 0.5);
					this.definitions = this.matches
						.map((m) => m.definition)
						.sort(() => Math.random() - 0.5);
				}

				this.isVisible = !this.answered;
			});
	}

	reorder(e: [string[], CdkDragDrop<string[]>]) {
		const [arr, event] = e;

		moveItemInArray(arr, event.previousIndex, event.currentIndex);
	}

	checkAnswers() {
		this.results = this.gameService.answerMatchingGameQuestion(this.terms, this.definitions);
		this.isVisible = false;
		this.gameService.goToNextStage();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
