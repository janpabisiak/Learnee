import { NgClass } from "@angular/common";
import {
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from "@angular/core";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { EAvailableGames, IGame } from "@services/game/game.service";
import { take } from "rxjs";

@Component({
	selector: "app-game-selector-item",
	imports: [NgClass, TranslatePipe],
	templateUrl: "./game-selector-item.component.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GameSelectorItemComponent implements OnInit {
	@Input() game: IGame | null = null;
	@Input({ required: true }) isSelected: boolean = false;
	@Output() gameClicked = new EventEmitter<EAvailableGames | "all">();
	translations: string[] | null = null;

	constructor(private translation: TranslateService) {}

	ngOnInit() {
		if (!this.game) return;

		const translationKeys = Object.values(keys[this.game.title]).map((key) => key);
		this.translation
			.get(translationKeys)
			.pipe(take(1))
			.subscribe((translations: Record<string, string>) => {
				this.translations = Object.values(translations).map(
					(translationValue) => translationValue
				);
			});
	}

	onGameClicked(game: EAvailableGames | "all") {
		this.gameClicked.emit(game);
	}
}

const keys: Record<EAvailableGames, translationKeys> = {
	Quiz: {
		title: "study.games.quiz.title",
		description: "study.games.quiz.description",
	},
	Matching: {
		title: "study.games.matching.title",
		description: "study.games.matching.description",
	},
	"True or false": {
		title: "study.games.trueFalse.title",
		description: "study.games.trueFalse.description",
	},
	"Fill gaps": {
		title: "study.games.fillGaps.title",
		description: "study.games.fillGaps.description",
	},
	Listening: {
		title: "study.games.listening.title",
		description: "study.games.listening.description",
	},
};

type translationKeys = {
	title: string;
	description: string;
};
