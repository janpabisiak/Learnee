import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { FoldersService } from "@services/folder/folders.service";
import { EFolderSortTypes } from "@services/folders-options/folders-options.service";
import { Subject, takeUntil } from "rxjs";

const sortTypes: Record<EFolderSortTypes, string> = {
	[EFolderSortTypes.NameASC]: "folderlist.sort.nameAsc",
	[EFolderSortTypes.NameDESC]: "folderlist.sort.nameDesc",
	[EFolderSortTypes.DescriptionASC]: "folderlist.sort.descriptionAsc",
	[EFolderSortTypes.DescriptionDESC]: "folderlist.sort.descriptionDesc",
	[EFolderSortTypes.IdASC]: "folderlist.sort.idAsc",
	[EFolderSortTypes.IdDESC]: "folderlist.sort.idDesc",
};

@Component({
	selector: "app-folder-list-sort",
	imports: [TranslatePipe],
	templateUrl: "./folder-list-sort.component.html",
	standalone: true,
})
export class FolderListSortComponent implements OnInit, OnDestroy {
	@ViewChild("sortTypeSelect") sortTypeSelectEl!: ElementRef<HTMLSelectElement>;
	sortTypes: { type: string; translationKey: string }[] = [];
	currentSortType: EFolderSortTypes = EFolderSortTypes.IdDESC;
	private destroy$ = new Subject<void>();

	constructor(private foldersService: FoldersService) {}

	ngOnInit() {
		this.foldersService.sortType$.pipe(takeUntil(this.destroy$)).subscribe((sortType) => {
			this.currentSortType = sortType;
		});

		this.sortTypes = Object.entries(sortTypes).map(([type, translationKey]) => ({
			type,
			translationKey,
		}));
	}

	changeSortType(value: string) {
		this.foldersService.setSortType(value as EFolderSortTypes);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
