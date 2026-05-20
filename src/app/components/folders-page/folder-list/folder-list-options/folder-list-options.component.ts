import { Component } from "@angular/core";
import { FolderListPurgerComponent } from "./folder-list-purger/folder-list-purger.component";
import { FolderListSearchBarComponent } from "./folder-list-search-bar/folder-list-search-bar.component";
import { FolderListSelectionControlButtonsComponent } from "./folder-list-selection-control-buttons/folder-list-selection-control-buttons.component";
import { FolderListSortComponent } from "./folder-list-sort/folder-list-sort.component";

@Component({
	selector: "app-folder-list-options",
	imports: [
		FolderListSearchBarComponent,
		FolderListSortComponent,
		FolderListPurgerComponent,
		FolderListSelectionControlButtonsComponent,
	],
	templateUrl: "./folder-list-options.component.html",
})
export class FolderListOptionsComponent {}
