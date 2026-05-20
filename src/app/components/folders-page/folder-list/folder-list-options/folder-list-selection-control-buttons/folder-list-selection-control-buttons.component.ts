import { Component, OnDestroy, OnInit } from "@angular/core";
import { ButtonComponent } from "@shared/button/button.component";
import { TranslatePipe } from "@ngx-translate/core";
import { FoldersService } from "@services/folder/folders.service";
import { Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-folder-list-selection-control-buttons",
	imports: [ButtonComponent, TranslatePipe],
	templateUrl: "./folder-list-selection-control-buttons.component.html",
})
export class FolderListSelectionControlButtonsComponent implements OnInit, OnDestroy {
	hasSelectedFolders = false;
	private destroy$ = new Subject<void>();

	constructor(private foldersService: FoldersService) {}

	ngOnInit() {
		this.foldersService.hasSelectedIds$
			.pipe(takeUntil(this.destroy$))
			.subscribe((hasSelectedIds) => {
				this.hasSelectedFolders = hasSelectedIds;
			});
	}

	selectAllVisible() {
		this.foldersService.selectAllVisible();
	}

	unselectAll() {
		this.foldersService.unselectAll();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
