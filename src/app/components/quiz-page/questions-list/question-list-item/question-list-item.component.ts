import { Component, Input } from "@angular/core";
import { LevelService } from "../../../../services/level.service";
import { WebSpeechService } from "../../../../services/web-speech.service";
import { IAnswer } from "../../../../types/answer.interface";

@Component({
	selector: "app-question-list-item",
	imports: [],
	templateUrl: "./question-list-item.component.html",
})
export class QuestionListItemComponent {
	@Input({ required: true }) content?: string;
	@Input({ required: true }) possibleAnswers?: IAnswer[];
	isAnswered = false;

	constructor(private webSpeechService: WebSpeechService, private levelService: LevelService) {}

	readWord() {
		this.webSpeechService.readText(this.content ?? "");
	}

	readDefinition(id: number) {
		if (this.possibleAnswers)
			this.webSpeechService.readText(
				this.possibleAnswers?.find((w) => w.id === id)?.content ?? ""
			);
	}

	revealAnswer(clickedAnswerId: number) {
		if (this.isAnswered) return;

		const isClickedAnswerCorrect = this.possibleAnswers?.find(
			(a) => a.id === clickedAnswerId
		)?.isCorrect;

		if (isClickedAnswerCorrect) this.levelService.addExpPoints(5);
		else this.levelService.removeExpPoints(5);

		this.isAnswered = true;
	}
}
