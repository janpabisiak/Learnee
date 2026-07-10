import { Component } from "@angular/core";
import { FoldersService } from "@services/folder/folders.service";
import { ItemsPerPageSelectorComponent } from "@shared/components/items-per-page-selector/items-per-page-selector.component";
import { PaginationButtonsComponent } from "@shared/components/pagination-buttons/pagination-buttons.component";
import { ResultsCounterComponent } from "@shared/components/results-counter/results-counter.component";
import { IResultRange } from "../../../../types/resultRange.interface";
import { combineLatest, Subject, takeUntil } from "rxjs";
import { ITEMS_PER_PAGE_OPTIONS } from "@shared/constants/pagination.constants";

@Component({
	selector: "app-folder-pagination-container",
	imports: [PaginationButtonsComponent, ResultsCounterComponent, ItemsPerPageSelectorComponent],
	templateUrl: "./folder-pagination-container.component.html",
	standalone: true,
})
export class FolderPaginationContainerComponent {
	resultRange: IResultRange | null = null;
	numberOfFolders = 0;
	page = 0;
	maxPage = 0;
	pages: number[] = [];
	foldersPerPage = 0;
	foldersPerPageOptions = ITEMS_PER_PAGE_OPTIONS;
	private destroy$ = new Subject<void>();

	constructor(private foldersService: FoldersService) {}

	ngOnInit() {
		combineLatest([
			this.foldersService.resultRange$,
			this.foldersService.numberOfFilteredFolders$,
			this.foldersService.page$,
			this.foldersService.maxPage$,
			this.foldersService.foldersPerPage$,
		])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([resultRange, numberOfFilteredFolders, page, maxPage, foldersPerPage]) => {
				this.resultRange = resultRange;
				this.numberOfFolders = numberOfFilteredFolders;
				this.page = page;
				this.maxPage = maxPage;
				this.pages = Array.from({ length: maxPage }, (_, i) => i).slice(
					page - 3 < 0 ? 0 : page - 3,
					page + 2,
				);
				this.foldersPerPage = foldersPerPage;
			});
	}

	setPage(page: number) {
		this.foldersService.setPage(page);
	}

	setFoldersPerPage(value: number) {
		this.foldersService.setFoldersPerPage(value);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
