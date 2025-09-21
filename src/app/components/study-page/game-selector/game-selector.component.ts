import { Component, OnDestroy, OnInit } from "@angular/core";
import { availableGames, EAvailableGames, GameService } from "@services/game.service";
import { GameSelectorItemComponent } from "./game-selector-item/game-selector-item.component";
import { Subject, takeUntil } from "rxjs";
import { SectionTitleComponent } from "@components/utils/section-title/section-title.component";

@Component({
	selector: "app-game-selector",
	imports: [GameSelectorItemComponent, SectionTitleComponent],
	templateUrl: "./game-selector.component.html",
})
export class GameSelectorComponent implements OnInit, OnDestroy {
	availableGames = availableGames;
	selectedGames: EAvailableGames[] = [];
	allGamesSelected = false;
	hasSelectedGames = true;
	private destroy$ = new Subject<void>();

	constructor(private gameService: GameService) {}

	ngOnInit() {
		this.gameService.selectedGames$
			.pipe(takeUntil(this.destroy$))
			.subscribe((selectedGames) => {
				this.hasSelectedGames = !!selectedGames.length;
				this.selectedGames = selectedGames;
				this.allGamesSelected = selectedGames.length === availableGames.length;
			});
	}

	toggleGameSelection(game: EAvailableGames | "all") {
		if (game === "all") {
			this.gameService.updateSelectedGames(
				!this.allGamesSelected
					? (availableGames.map((game) => game.title) as EAvailableGames[])
					: []
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
