import { Component, Input } from "@angular/core";
import { IAnswer } from "../../../../types/answer.interface";
import { WebSpeechService } from "../../../../services/web-speech.service";

@Component({
	selector: "app-question-list-item",
	imports: [],
	templateUrl: "./question-list-item.component.html",
	styleUrl: "./question-list-item.component.scss",
})
export class QuestionListItemComponent {
	@Input({ required: true }) content?: string;
	@Input({ required: true }) possibleAnswers?: IAnswer[];

	constructor(private webSpeechService: WebSpeechService) {}

	readWord() {
		this.webSpeechService.readText(this.content ?? "");
	}

	readDefinition(id: number) {
		if (this.possibleAnswers)
			this.webSpeechService.readText(this.possibleAnswers[id].content ?? "");
	}
}
