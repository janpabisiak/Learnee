import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { GameService } from "@services/game/game.service";
import { Subject, takeUntil } from "rxjs";
import { FoldersSelectorComponent } from "../folders-selector/folders-selector.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
	selector: "app-game-options",
	imports: [FoldersSelectorComponent, TranslatePipe],
	templateUrl: "./game-options.component.html",
})
export class GameOptionsComponent implements OnInit, OnDestroy {
	private gameService = inject(GameService);
	private destroy$ = new Subject<void>();
	numberOfStages: number = 0;

	ngOnInit(): void {
		this.gameService.numberOfStages$
			.pipe(takeUntil(this.destroy$))
			.subscribe((numberOfStages) => {
				this.numberOfStages = numberOfStages;
			});
	}

	updateNumberOfStages(value: number): void {
		this.gameService.updateNumberOfStages(value);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
