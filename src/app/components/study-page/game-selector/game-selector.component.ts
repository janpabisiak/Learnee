import { Component, OnDestroy, OnInit } from "@angular/core";
import { availableGames, EAvailableGames, GameService } from "@services/game/game.service";
import { GameSelectorItemComponent } from "./game-selector-item/game-selector-item.component";
import { Subject, take, takeUntil } from "rxjs";
import { SectionTitleComponent } from "@components/utils/section-title/section-title.component";
import { TranslateService } from "@ngx-translate/core";
import { NgIf } from "@angular/common";

@Component({
	selector: "app-game-selector",
	imports: [GameSelectorItemComponent, SectionTitleComponent, NgIf],
	templateUrl: "./game-selector.component.html",
})
export class GameSelectorComponent implements OnInit, OnDestroy {
	availableGames = availableGames;
	selectedGames: EAvailableGames[] = [];
	allGamesSelected = false;
	hasSelectedGames = true;
	translations: Record<string, string> | null = null;
	private destroy$ = new Subject<void>();

	constructor(private gameService: GameService, private translation: TranslateService) {}

	ngOnInit() {
		this.gameService.selectedGames$
			.pipe(takeUntil(this.destroy$))
			.subscribe((selectedGames) => {
				this.hasSelectedGames = !!selectedGames.length;
				this.selectedGames = selectedGames;
				this.allGamesSelected = selectedGames.length === availableGames.length;
			});

		this.translation
			.get(["study.prepare.title", "study.prepare.button"])
			.pipe(take(1))
			.subscribe((translations) => {
				this.translations = translations;
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
