import { Component } from "@angular/core";
import { FoldersService } from "@services/folder/folders.service";
import { EFolderSortTypes } from "@services/folders-options/folders-options.service";
import { ModalService } from "@services/modal/modal.service";
import { EModalType } from "@shared/constants/modal.constants";
import { ItemsPurgerComponent } from "@shared/components/items-purger/items-purger.component";
import { ItemsSelectionControlButtonsComponent } from "@shared/components/items-selection-control-buttons/items-selection-control-buttons.component";
import { ItemsSortComponent } from "@shared/components/items-sort/items-sort.component";
import { SearchBarComponent } from "@shared/components/search-bar/search-bar.component";
import { commonSortOptionsTranslationKeys } from "@shared/constants/sorting.constants";
import { Subject, takeUntil } from "rxjs";

const sortOptionsTranslationKeys: Record<EFolderSortTypes, string> = {
	...commonSortOptionsTranslationKeys,
	[EFolderSortTypes.DescriptionASC]: "folderlist.sort.descriptionAsc",
	[EFolderSortTypes.DescriptionDESC]: "folderlist.sort.descriptionDesc",
};

@Component({
	selector: "app-folder-list-options",
	imports: [
		SearchBarComponent,
		ItemsPurgerComponent,
		ItemsSelectionControlButtonsComponent,
		ItemsSortComponent,
	],
	templateUrl: "./folder-list-options.component.html",
})
export class FolderListOptionsComponent {
	hasSelectedFolders = false;
	numberOfSelectedFolders = 0;
	hasAllVisibleSelected = false;
	hasMultiplePages = false;
	sortOptions: { type: string; translationKey: string }[] = [];
	currentSortOption: EFolderSortTypes = EFolderSortTypes.IdDESC;
	private destroy$ = new Subject<void>();

	constructor(
		private modalService: ModalService,
		private foldersService: FoldersService,
	) {}

	ngOnInit() {
		this.foldersService.selectedIds$.pipe(takeUntil(this.destroy$)).subscribe((selectedIds) => {
			this.hasSelectedFolders = selectedIds.length > 0;
			this.numberOfSelectedFolders = selectedIds.length;
		});

		this.foldersService.sortType$.pipe(takeUntil(this.destroy$)).subscribe((sortType) => {
			this.currentSortOption = sortType;
		});

		this.sortOptions = Object.entries(sortOptionsTranslationKeys).map(
			([type, translationKey]) => ({
				type,
				translationKey,
			}),
		);

		this.foldersService.hasAllVisibleSelected$
			.pipe(takeUntil(this.destroy$))
			.subscribe((hasAllVisibleSelected) => {
				this.hasAllVisibleSelected = hasAllVisibleSelected;
			});

		this.foldersService.maxPage$.pipe(takeUntil(this.destroy$)).subscribe((maxPage) => {
			this.hasMultiplePages = maxPage > 1;
		});
	}

	search(value: string) {
		this.foldersService.setSearchQuery(value);
	}

	openDeletionModal() {
		this.modalService.toggleModal(EModalType.FolderDeletion, true);
	}

	selectAllVisible() {
		this.foldersService.selectAllVisible();
	}

	unselectAll() {
		this.foldersService.unselectAll();
	}

	changeSortType(value: string) {
		this.foldersService.setSortType(value as EFolderSortTypes);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
