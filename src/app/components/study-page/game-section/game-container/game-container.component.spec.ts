import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GameContainerComponent } from "./game-container.component";
import { QuizGameComponent } from "@components/study-page/quiz-game/quiz-game.component";
import { TrueFalseGameComponent } from "@components/study-page/true-false-game/true-false-game.component";
import { MatchingGameComponent } from "@components/study-page/matching-game/matching-game.component";
import { FillGapsGameComponent } from "@components/study-page/fill-gaps-listening-game/fill-gaps-listening-game.component";

describe("GameContainerComponent", () => {
	let component: GameContainerComponent;
	let fixture: ComponentFixture<GameContainerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				GameContainerComponent,
				QuizGameComponent,
				MatchingGameComponent,
				TrueFalseGameComponent,
				FillGapsGameComponent,
			],
		}).compileComponents();

		fixture = TestBed.createComponent(GameContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
