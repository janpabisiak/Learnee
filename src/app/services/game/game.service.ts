import { Injectable } from "@angular/core";
import { IMatch, MatchingGameService } from "@services/matching-game/matching-game.service";
import { QuizService } from "@services/quiz/quiz.service";
import { BehaviorSubject } from "rxjs";
import {
	ITrueFalseGameData,
	TrueFalseGameService,
} from "../true-false-game/true-false-game.service";
import { IQuestion } from "../../types/question.interface";
import {
	FillGapsListeningGameService,
	IFillGapsListeningGameData,
} from "@services/fill-gaps-listening-game/fill-gaps-listening-game.service";
import { LevelService } from "@services/level/level.service";
import { StatisticsService } from "@services/statistics/statistics.service";
import {
	availableGames,
	DEFAULT_NUMBER_OF_STAGES,
	EAvailableGames,
	STAGE_TRANSITION_DELAY,
	XP_PENALTY_ON_LOSS,
} from "@shared/constants/game.constants";

@Injectable({
	providedIn: "root",
})
export class GameService {
	private stages = new BehaviorSubject<IStage[]>([]);
	private selectedGames = new BehaviorSubject<EAvailableGames[]>([
		EAvailableGames.Quiz,
		EAvailableGames.MatchingGame,
		EAvailableGames.TrueOrFalse,
		EAvailableGames.FillGaps,
		EAvailableGames.Listening,
	]);
	private currentStageId = new BehaviorSubject<number>(0);
	stages$ = this.stages.asObservable();
	selectedGames$ = this.selectedGames.asObservable();
	currentStageId$ = this.currentStageId.asObservable();
	numberOfStages = DEFAULT_NUMBER_OF_STAGES;

	constructor(
		private matchingGameService: MatchingGameService,
		private quizService: QuizService,
		private trueFalseGameService: TrueFalseGameService,
		private fillGapsListeningGameService: FillGapsListeningGameService,
		private levelService: LevelService,
		private statisticsService: StatisticsService
	) {}

	generateStages() {
		const selectedGames = this.selectedGames.value;
		const randomGames = [];

		for (let i = 0; i < this.numberOfStages; i++) {
			randomGames.push(Math.floor(Math.random() * selectedGames.length));
		}

		const stages = randomGames.map((gameIndex, i) => {
			switch (selectedGames[gameIndex]) {
				case EAvailableGames.MatchingGame:
					return this.setStageData(
						i,
						EAvailableGames.MatchingGame,
						this.matchingGameService.generateMatchingGame()
					);
				case EAvailableGames.TrueOrFalse:
					return this.setStageData(
						i,
						EAvailableGames.TrueOrFalse,
						this.trueFalseGameService.generateTrueFalseGame()
					);
				case EAvailableGames.FillGaps:
					return this.setStageData(
						i,
						EAvailableGames.FillGaps,
						this.fillGapsListeningGameService.generateFillGapsListeningGame()
					);
				case EAvailableGames.Listening:
					return this.setStageData(
						i,
						EAvailableGames.Listening,
						this.fillGapsListeningGameService.generateFillGapsListeningGame()
					);
				default:
					return this.setStageData(
						i,
						EAvailableGames.Quiz,
						this.quizService.generateQuestion()
					);
			}
		});

		this.stages.next(stages);
		this.statisticsService.registerGame();
	}

	setNumberOfStages(amount: number) {
		this.numberOfStages = amount;
	}

	answerQuizQuestion(answerId: number) {
		const currentStageId = this.currentStageId.value;
		const stages = this.stages.value;
		const currentStage = stages[currentStageId];

		const question = this.quizService.answerQuestion(currentStage.data, answerId);
		const updatedStages = stages.map((stage) =>
			stage.id === currentStageId
				? {
						...stages[currentStageId],
						answered: true,
						answeredCorrect: question.answeredCorrect,
						data: question,
				  }
				: stage
		);

		this.stages.next(updatedStages);
		this.updateUserXp(EAvailableGames.Quiz, question.answeredCorrect);
	}

	answerMatchingGameQuestion(terms: string[], definitions: string[]) {
		const currentStageId = this.currentStageId.value;
		const stages = this.stages.value;
		const currentStage = stages[currentStageId];

		const results = this.matchingGameService.checkAnswers(
			currentStage.data,
			terms,
			definitions
		);

		const isCorrect = results.every((r) => r);

		const updatedStages = stages.map((stage) =>
			stage.id === currentStageId
				? {
						...stage,
						answered: true,
						answeredCorrect: isCorrect,
				  }
				: stage
		);

		this.stages.next(updatedStages);
		this.updateUserXp(EAvailableGames.MatchingGame, isCorrect);

		return results;
	}

	answerTrueFalseGameQuestion(isTrue: boolean) {
		const currentStageId = this.currentStageId.value;
		const stages = this.stages.value;
		const currentStage = stages[currentStageId];

		const isCorrect = currentStage.data.isCorrect === isTrue;

		const updatedStages = stages.map((stage) =>
			stage.id === currentStageId
				? {
						...stage,
						answered: true,
						answeredCorrect: isCorrect,
				  }
				: stage
		);

		this.stages.next(updatedStages);
		this.updateUserXp(EAvailableGames.TrueOrFalse, isCorrect);
	}

	answerFillGapsListeningGameQuestion(answer: string) {
		const currentStageId = this.currentStageId.value;
		const stages = this.stages.value;
		const currentStage = stages[currentStageId];

		const isCorrect = currentStage.data.word.trim().toLowerCase() === answer.toLowerCase();

		const updatedStages = stages.map((stage) =>
			stage.id === currentStageId
				? {
						...stage,
						answered: true,
						answeredCorrect: isCorrect,
				  }
				: stage
		);

		this.stages.next(updatedStages);
		this.updateUserXp(EAvailableGames.FillGaps, isCorrect);
	}

	goToNextStage() {
		const currentStageId = this.currentStageId.value;

		setTimeout(() => {
			if (currentStageId < this.stages.value.length) {
				this.currentStageId.next(currentStageId + 1);
			}
		}, STAGE_TRANSITION_DELAY);
	}

	updateSelectedGames(selectedGames: EAvailableGames[]) {
		this.selectedGames.next(selectedGames);
	}

	private setStageData(
		id: number,
		type: EAvailableGames,
		gameData: IQuestion | IMatch[] | ITrueFalseGameData | IFillGapsListeningGameData
	): IStage {
		return {
			id,
			type,
			data: gameData,
			answered: false,
			answeredCorrect: false,
		};
	}

	private updateUserXp(type: EAvailableGames, isCorrect: boolean) {
		const expOnWin = availableGames.find((game) => game.title === type)!.expIfWin;

		isCorrect
			? this.levelService.addXpPoints(expOnWin)
			: this.levelService.removeXpPoints(XP_PENALTY_ON_LOSS);
	}

	cancelGame() {
		this.stages.next([]);
		this.currentStageId.next(0);
	}
}

export interface IStage {
	id: number;
	type: EAvailableGames;
	data: any;
	answered: boolean;
	answeredCorrect: boolean;
}
