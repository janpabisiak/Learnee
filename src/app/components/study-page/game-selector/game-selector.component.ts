import { Component, OnInit } from "@angular/core";
import { availableGames, EAvailableGames, GameService } from "@services/game.service";
import { GameSelectorItemComponent } from "./game-selector-item/game-selector-item.component";
import { Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-game-selector",
	imports: [GameSelectorItemComponent],
	templateUrl: "./game-selector.component.html",
})
export class GameSelectorComponent implements OnInit {
	availableGames = availableGames;
	selectedGames: EAvailableGames[] = [];
	allGamesSelected = false;
	private destroy$ = new Subject<void>();

	constructor(private gameService: GameService) {}

	ngOnInit() {
		this.gameService.selectedGames$
			.pipe(takeUntil(this.destroy$))
			.subscribe((selectedGames) => {
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
}
