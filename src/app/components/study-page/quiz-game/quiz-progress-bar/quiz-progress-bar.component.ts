import { Component, Input } from "@angular/core";
import { IQuestion } from "../../../../types/question.interface";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-quiz-progress-bar",
	imports: [CommonModule],
	templateUrl: "./quiz-progress-bar.component.html",
})
export class QuizProgressBarComponent {
	@Input({ required: true }) questions!: IQuestion[];
}
