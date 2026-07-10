import { inject, Injectable } from "@angular/core";
import { FillGapsListeningGameService } from "@services/fill-gaps-listening-game/fill-gaps-listening-game.service";
import { LevelService } from "@services/level/level.service";
import { MatchingGameService } from "@services/matching-game/matching-game.service";
import { QuizService } from "@services/quiz/quiz.service";
import { StatisticsService } from "@services/statistics/statistics.service";
import {
	availableGames,
	DEFAULT_NUMBER_OF_STAGES,
	EAvailableGames,
	STAGE_TRANSITION_DELAY,
	XP_PENALTY_ON_LOSS,
} from "@shared/constants/game.constants";
import { GameStore } from "app/stores/game/game.store";
import { TrueFalseGameService } from "../true-false-game/true-false-game.service";
import { IGameStrategy } from "../../types/game-strategy.interface";

@Injectable({
	providedIn: "root",
})
export class GameService {
	private gameStore = inject(GameStore);
	private levelService = inject(LevelService);
	private statisticsService = inject(StatisticsService);

	private quizService = inject(QuizService);
	private matchingGameService = inject(MatchingGameService);
	private trueFalseGameService = inject(TrueFalseGameService);
	private fillGapsListeningGameService = inject(FillGapsListeningGameService);

	private gameStrategies: Record<EAvailableGames, IGameStrategy> = {
		[EAvailableGames.Quiz]: this.quizService,
		[EAvailableGames.MatchingGame]: this.matchingGameService,
		[EAvailableGames.TrueOrFalse]: this.trueFalseGameService,
		[EAvailableGames.FillGaps]: this.fillGapsListeningGameService,
		[EAvailableGames.Listening]: this.fillGapsListeningGameService,
	};

	private timeoutId: number | null = null;

	stages$ = this.gameStore.stages$;
	numberOfStages$ = this.gameStore.numberOfStages$;
	selectedGames$ = this.gameStore.selectedGames$;
	currentStageId$ = this.gameStore.currentStageId$;
	selectedFolderIds$ = this.gameStore.selectedFolderIds$;

	generateStages() {
		const selectedGames = this.gameStore.selectedGamesValue;
		const stages = Array.from({ length: this.gameStore.numberOfStagesValue }, (_, i) => {
			const gameIndex = Math.floor(Math.random() * selectedGames.length);
			const type = selectedGames[gameIndex];
			const data = this.gameStrategies[type].generateGameData();

			return {
				id: i,
				type,
				data,
				answered: false,
				answeredCorrect: false,
			};
		});

		this.gameStore.setStages(stages);
		this.statisticsService.registerGame();
	}

	submitAnswer<TAnswer, TResult>(answer: TAnswer): TResult | undefined {
		const currentStageId = this.gameStore.currentStageIdValue;
		const stages = this.gameStore.stagesValue;
		const currentStage = stages[currentStageId];

		const strategy = this.gameStrategies[currentStage.type];
		if (!strategy) return;

		const { isCorrect, updatedData, returnVal } = strategy.validateAnswer(
			currentStage.data,
			answer,
		);

		const updatedStages = stages.map((stage) =>
			stage.id === currentStageId
				? {
						...stage,
						answered: true,
						answeredCorrect: isCorrect,
						data: updatedData ?? stage.data,
					}
				: stage,
		);

		this.gameStore.setStages(updatedStages);
		this.updateUserXp(currentStage.type, isCorrect);

		return returnVal;
	}

	goToNextStage() {
		const currentStageId = this.gameStore.currentStageIdValue;
		const stages = this.gameStore.stagesValue;

		this.timeoutId = setTimeout(() => {
			if (currentStageId < stages.length) {
				this.gameStore.setCurrentStageId(currentStageId + 1);
			}
		}, STAGE_TRANSITION_DELAY);
	}

	updateNumberOfStages(numberOfStages: number) {
		this.gameStore.setNumberOfStages(numberOfStages);
	}

	updateSelectedGames(selectedGames: EAvailableGames[]) {
		this.gameStore.setSelectedGames(selectedGames);
	}

	updateSelectedFolders(folderIds: number[]) {
		this.gameStore.setSelectedFolderIds(folderIds);
	}

	private updateUserXp(type: EAvailableGames, isCorrect: boolean) {
		const expOnWin = availableGames.find((game) => game.title === type)!.expIfWin;

		isCorrect
			? this.levelService.addXpPoints(expOnWin)
			: this.levelService.removeXpPoints(XP_PENALTY_ON_LOSS);
	}

	cancelGame() {
		if (this.timeoutId !== null) {
			clearTimeout(this.timeoutId);
			this.timeoutId = null;
		}

		this.gameStore.setStages([]);
		this.gameStore.setCurrentStageId(0);
	}
}
