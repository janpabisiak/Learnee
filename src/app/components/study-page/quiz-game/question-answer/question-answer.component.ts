import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IAnswer } from "../../../../types/answer.interface";
import { CommonModule } from "@angular/common";
import { GameService } from "@services/game/game.service";

@Component({
	selector: "app-question-answer",
	imports: [CommonModule],
	templateUrl: "./question-answer.component.html",
})
export class QuestionAnswerComponent {
	@Input({ required: true }) answer!: IAnswer;
	@Input() showAnswer = false;
	@Output() answered = new EventEmitter<void>();

	constructor(private gameService: GameService) {}

	answerQuestion(answerId: number) {
		this.gameService.answerQuizQuestion(answerId);

		this.gameService.goToNextStage();
		this.answered.emit();
	}
}
