import { Component } from "@angular/core";
import { QuestionsListComponent } from "./questions-list/questions-list.component";

@Component({
	selector: "app-quiz-page",
	imports: [QuestionsListComponent],
	templateUrl: "./quiz-page.component.html",
	standalone: true,
})
export class QuizPageComponent {}
