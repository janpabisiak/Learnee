import { Component, Input } from "@angular/core";
import { IAnswer } from "../../../../types/answer.interface";

@Component({
	selector: "app-question-list-item",
	imports: [],
	templateUrl: "./question-list-item.component.html",
	styleUrl: "./question-list-item.component.scss",
})
export class QuestionListItemComponent {
	@Input({ required: true }) content?: string;
	@Input({ required: true }) possibleAnswers?: IAnswer[];
}
