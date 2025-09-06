import { Injectable } from "@angular/core";
import { MatchingGameService } from "./matching-game.service";
import { QuizService } from "./quiz.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class GameService {
	private stages = new BehaviorSubject<IStage[]>([]);
	private selectedGames = new BehaviorSubject<EAvailableGames[]>([
		EAvailableGames.Quiz,
		EAvailableGames.MatchingGame,
	]);
	private currentStageId = new BehaviorSubject<number>(0);
	stages$ = this.stages.asObservable();
	selectedGames$ = this.selectedGames.asObservable();
	currentStageId$ = this.currentStageId.asObservable();
	numberOfStages = 10;

	constructor(
		private matchingGameService: MatchingGameService,
		private quizService: QuizService
	) {}

	generateStages() {
		const selectedGames = this.selectedGames.value;
		const randomGames = [];

		for (let i = 0; i < this.numberOfStages; i++) {
			randomGames.push(Math.floor(Math.random() * selectedGames.length));
		}

		const stages = randomGames.map((gameIndex, i) => {
			switch (selectedGames[gameIndex]) {
				case EAvailableGames.Quiz:
					return {
						id: i,
						type: EAvailableGames.Quiz,
						data: this.quizService.generateQuestion(),
						answered: false,
						answeredCorrect: false,
					};
				case EAvailableGames.MatchingGame:
					return {
						id: i,
						type: EAvailableGames.MatchingGame,
						data: this.matchingGameService.generateMatchingGame(),
						answered: false,
						answeredCorrect: false,
					};
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
	MatchingGame = "MatchingGame",
}
