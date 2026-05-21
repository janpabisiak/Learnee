import { Component } from "@angular/core";
import { SectionTitleComponent } from "@shared/components/section-title/section-title.component";
import { FolderListComponent } from "./folder-list/folder-list.component";
import { TranslatePipe } from "@ngx-translate/core";
import { FoldersService } from "@services/folder/folders.service";
import { Subscription } from "rxjs";

@Component({
	selector: "app-folders-page",
	imports: [SectionTitleComponent, FolderListComponent, TranslatePipe],
	templateUrl: "./folders-page.component.html",
})
export class FoldersPageComponent {
	private subscription = new Subscription();
	numberOfFolders = 0;

	constructor(private foldersService: FoldersService) {}

	ngOnInit() {
		this.subscription = this.foldersService.numberOfFolders$.subscribe((numberOfFolders) => {
			this.numberOfFolders = numberOfFolders;
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
