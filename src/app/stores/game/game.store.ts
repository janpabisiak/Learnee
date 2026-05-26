import { Injectable } from "@angular/core";
import { EAvailableGames } from "@shared/constants/game.constants";
import { IStage } from "../../types/stage.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class GameStore {
	private stages = new BehaviorSubject<IStage[]>([]);
	private selectedGames = new BehaviorSubject<EAvailableGames[]>([
		EAvailableGames.Quiz,
		EAvailableGames.MatchingGame,
		EAvailableGames.TrueOrFalse,
		EAvailableGames.FillGaps,
		EAvailableGames.Listening,
	]);
	private currentStageId = new BehaviorSubject<number>(0);
	private selectedFolderIds = new BehaviorSubject<number[]>([]);

	stages$ = this.stages.asObservable();
	selectedGames$ = this.selectedGames.asObservable();
	currentStageId$ = this.currentStageId.asObservable();
	selectedFolderIds$ = this.selectedFolderIds.asObservable();

	get stagesValue() {
		return this.stages.value;
	}

	setStages(value: IStage[]) {
		this.stages.next(value);
	}

	get selectedGamesValue() {
		return this.selectedGames.value;
	}

	setSelectedGames(value: EAvailableGames[]) {
		this.selectedGames.next(value);
	}

	get currentStageIdValue() {
		return this.currentStageId.value;
	}

	setCurrentStageId(value: number) {
		this.currentStageId.next(value);
	}

	setSelectedFolderIds(value: number[]) {
		this.selectedFolderIds.next(value);
	}
}
