import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { GameService } from "@services/game/game.service";
import { SectionTitleComponent } from "@shared/components/section-title/section-title.component";
import {
	availableGames,
	EAvailableGames,
	MAX_STAGES_TO_PLAY,
	MIN_STAGES_TO_PLAY,
} from "@shared/constants/game.constants";
import { Subject, takeUntil } from "rxjs";
import { GameOptionsComponent } from "./game-options/game-options.component";
import { GameSelectorItemComponent } from "./game-selector-item/game-selector-item.component";

@Component({
	selector: "app-game-selector",
	imports: [
		GameSelectorItemComponent,
		SectionTitleComponent,
		TranslatePipe,
		GameOptionsComponent,
	],
	templateUrl: "./game-selector.component.html",
})
export class GameSelectorComponent implements OnInit, OnDestroy {
	availableGames = availableGames;
	selectedGames: EAvailableGames[] = [];
	allGamesSelected = false;
	hasSelectedGames = false;
	hasValidNumberOfStages = false;
	translations: Record<string, string> | null = null;
	private destroy$ = new Subject<void>();

	constructor(private gameService: GameService) {}

	ngOnInit() {
		this.gameService.selectedGames$
			.pipe(takeUntil(this.destroy$))
			.subscribe((selectedGames) => {
				this.hasSelectedGames = selectedGames.length > 0;
				this.selectedGames = selectedGames;
				this.allGamesSelected = selectedGames.length === availableGames.length;
			});

		this.gameService.numberOfStages$
			.pipe(takeUntil(this.destroy$))
			.subscribe((numberOfStages) => {
				this.hasValidNumberOfStages =
					!isNaN(numberOfStages) &&
					numberOfStages >= MIN_STAGES_TO_PLAY &&
					numberOfStages <= MAX_STAGES_TO_PLAY;
			});
	}

	toggleGameSelection(game: EAvailableGames | "all") {
		if (game === "all") {
			this.gameService.updateSelectedGames(
				!this.allGamesSelected
					? (availableGames.map((game) => game.title) as EAvailableGames[])
					: [],
			);

			return;
		}

		const isGameSelected = this.selectedGames.includes(game);

		if (isGameSelected) {
			this.gameService.updateSelectedGames([...this.selectedGames].filter((g) => g !== game));
		} else {
			this.gameService.updateSelectedGames([...this.selectedGames, game]);
		}
	}

	startGame() {
		this.gameService.generateStages();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
