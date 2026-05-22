import { Component, Input } from "@angular/core";
import { FillGapsGameComponent } from "@components/study-page/fill-gaps-listening-game/fill-gaps-listening-game.component";
import { MatchingGameComponent } from "@components/study-page/matching-game/matching-game.component";
import { QuizGameComponent } from "@components/study-page/quiz-game/quiz-game.component";
import { TrueFalseGameComponent } from "@components/study-page/true-false-game/true-false-game.component";
import { IStage } from "@services/game/game.service";
import { EAvailableGames } from "@shared/constants/game.constants";

@Component({
	selector: "app-game-container",
	imports: [
		QuizGameComponent,
		MatchingGameComponent,
		TrueFalseGameComponent,
		FillGapsGameComponent,
	],
	templateUrl: "./game-container.component.html",
})
export class GameContainerComponent {
	@Input() stage: IStage | null = null;
	EAvailableGames = EAvailableGames;
}
