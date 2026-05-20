import { NgIf } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { FoldersService } from "@services/folder/folders.service";
import { take } from "rxjs";

@Component({
	selector: "app-folder-list-search-bar",
	imports: [NgIf],
	templateUrl: "./folder-list-search-bar.component.html",
})
export class FolderListSearchBarComponent implements OnInit {
	translationValue: string | null = null;

	@HostListener("input", ["$event.target"])
	search(hostEl: HTMLInputElement) {
		this.foldersService.setSearchQuery(hostEl.value);
	}

	constructor(
		private foldersService: FoldersService,
		private translation: TranslateService,
	) {}

	ngOnInit() {
		this.translation
			.get("folderlist.searchPlaceholder")
			.pipe(take(1))
			.subscribe((translation) => {
				this.translationValue = translation;
			});
	}
}
