import { NgClass } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from "@angular/core";
import { EAvailableGames, IGame } from "@services/game.service";

@Component({
	selector: "app-game-selector-item",
	imports: [NgClass],
	templateUrl: "./game-selector-item.component.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GameSelectorItemComponent {
	@Input() game: IGame | null = null;
	@Input({ required: true }) isSelected: boolean = false;
	@Output() gameClicked = new EventEmitter<EAvailableGames | "all">();

	onGameClicked(game: EAvailableGames | "all") {
		this.gameClicked.emit(game);
	}
}
