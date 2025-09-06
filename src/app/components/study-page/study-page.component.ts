import { Component } from "@angular/core";
import { MatchingGameComponent } from "./matching-game/matching-game.component";
import { QuizGameComponent } from "./quiz-game/quiz-game.component";

@Component({
	selector: "app-study-page",
	imports: [MatchingGameComponent, QuizGameComponent],
	templateUrl: "./study-page.component.html",
})
export class StudyPageComponent {}
