import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { FoldersService } from "@services/folder/folders.service";
import { combineLatest, Subject, takeUntil } from "rxjs";
import { IFolder } from "../../../types/folder.interface";
import { FolderListItemComponent } from "./folder-list-item/folder-list-item.component";
import { FolderListOptionsComponent } from "./folder-list-options/folder-list-options.component";
import { FolderPaginationContainerComponent } from "./folder-pagination-container/folder-pagination-container.component";

@Component({
	selector: "app-folder-list",
	imports: [
		CommonModule,
		FolderListItemComponent,
		FolderListOptionsComponent,
		FolderPaginationContainerComponent,
		TranslatePipe,
	],
	templateUrl: "./folder-list.component.html",
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FolderListComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();
	hasFolders = false;
	folders: IFolder[] = [];
	isFolderListLoaded = false;

	constructor(private foldersService: FoldersService) {}

	ngOnInit() {
		combineLatest([this.foldersService.folders$, this.foldersService.visibleFolders$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([folders, visibleFolders]) => {
				this.hasFolders = folders.length > 0;
				this.folders = visibleFolders;
				this.isFolderListLoaded = true;
			});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
