import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { FoldersService } from "@services/folder/folders.service";
import { GameService } from "@services/game/game.service";
import { MultiselectComponent } from "@shared/components/multiselect/multiselect.component";
import { combineLatest, Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-folders-selector",
	imports: [MultiselectComponent, TranslatePipe],
	templateUrl: "./folders-selector.component.html",
})
export class FoldersSelectorComponent implements OnInit, OnDestroy {
	folders: { key: number; value: string }[] = [];
	selectedFolders: { key: number; value: string }[] = [];
	private destroy$ = new Subject<void>();

	constructor(
		private foldersService: FoldersService,
		private gameService: GameService,
	) {}

	ngOnInit(): void {
		combineLatest([this.foldersService.folders$, this.gameService.selectedFolderIds$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([folders, selectedFolderIds]) => {
				this.folders = folders.map((folder) => ({
					key: folder.id,
					value: folder.name,
				}));

				this.selectedFolders = this.folders.filter((folder) =>
					selectedFolderIds.includes(folder.key),
				);
			});
	}

	updateSelectedFolderIds(folderIds: number[]): void {
		this.gameService.updateSelectedFolders(folderIds);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
