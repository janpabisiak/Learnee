import { Injectable } from "@angular/core";
import { IMatch, MatchingGameService } from "./matching-game.service";
import { QuizService } from "./quiz.service";
import { BehaviorSubject } from "rxjs";
import { ITrueFalseGameData, TrueFalseGameService } from "./true-false-game.service";
import { IQuestion } from "../types/question.interface";

@Injectable({
	providedIn: "root",
})
export class GameService {
	private stages = new BehaviorSubject<IStage[]>([]);
	private selectedGames = new BehaviorSubject<EAvailableGames[]>([
		EAvailableGames.Quiz,
		EAvailableGames.MatchingGame,
		EAvailableGames.TrueOrFalse,
	]);
	private currentStageId = new BehaviorSubject<number>(0);
	stages$ = this.stages.asObservable();
	selectedGames$ = this.selectedGames.asObservable();
	currentStageId$ = this.currentStageId.asObservable();
	numberOfStages = 10;

	constructor(
		private matchingGameService: MatchingGameService,
		private quizService: QuizService,
		private trueFalseGameService: TrueFalseGameService
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
				case EAvailableGames.TrueOrFalse: {
					return this.setStageData(
						i,
						EAvailableGames.TrueOrFalse,
						this.trueFalseGameService.generateTrueFalseGame()
					);
				}
				default: {
					return this.setStageData(
						i,
						EAvailableGames.Quiz,
						this.quizService.generateQuestion()
					);
				}
			}
		});

		this.stages.next(stages);
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

		const updatedStages = stages.map((stage) =>
			stage.id === currentStageId
				? {
						...stage,
						answered: true,
						answeredCorrect: results.every((r) => r),
				  }
				: stage
		);

		this.stages.next(updatedStages);

		return results;
	}

	answerTrueFalseGameQuestion(isTrue: boolean) {
		const currentStageId = this.currentStageId.value;
		const stages = this.stages.value;
		const currentStage = stages[currentStageId];

		const updatedStages = stages.map((stage) =>
			stage.id === currentStageId
				? {
						...stage,
						answered: true,
						answeredCorrect: currentStage.data.isCorrect === isTrue,
				  }
				: stage
		);

		this.stages.next(updatedStages);
	}

	goToNextStage() {
		const currentStageId = this.currentStageId.value;

		setTimeout(() => {
			if (currentStageId < this.stages.value.length - 1) {
				this.currentStageId.next(currentStageId + 1);
			}
		}, 2000);
	}

	updateSelectedGames(selectedGames: EAvailableGames[]) {
		this.selectedGames.next(selectedGames);
	}

	private setStageData(
		id: number,
		type: EAvailableGames,
		gameData: IQuestion | IMatch[] | ITrueFalseGameData
	): IStage {
		return {
			id,
			type,
			data: gameData,
			answered: false,
			answeredCorrect: false,
		};
	}
}

export interface IStage {
	id: number;
	type: EAvailableGames;
	data: any;
	answered: boolean;
	answeredCorrect: boolean;
}

export enum EAvailableGames {
	Quiz = "Quiz",
	MatchingGame = "Matching",
	TrueOrFalse = "True or false",
	FillGaps = "Fill gaps",
	Listening = "Listening",
}

export interface IGame {
	id: number;
	title: EAvailableGames;
	description: string;
	icon: string;
}

export const availableGames: IGame[] = [
	{
		id: 0,
		title: EAvailableGames.Quiz,
		description: "Select correct definition for given word",
		icon: "library-outline",
	},
	{
		id: 1,
		title: EAvailableGames.MatchingGame,
		description: "Match word with its definition",
		icon: "shuffle-outline",
	},
	{
		id: 2,
		title: EAvailableGames.TrueOrFalse,
		description: "Check whether word has correct definition",
		icon: "help-outline",
	},
	{
		id: 3,
		title: EAvailableGames.FillGaps,
		description: "Check whether word has correct definition",
		icon: "text-outline",
	},
	{
		id: 4,
		title: EAvailableGames.Listening,
		description: "Select correct word from read definition",
		icon: "volume-medium-outline",
	},
];
