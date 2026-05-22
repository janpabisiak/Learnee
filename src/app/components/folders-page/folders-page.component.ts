import { Component } from "@angular/core";
import { SectionTitleComponent } from "@shared/components/section-title/section-title.component";
import { FolderListComponent } from "./folder-list/folder-list.component";
import { TranslatePipe } from "@ngx-translate/core";
import { FoldersService } from "@services/folder/folders.service";
import { ModalService } from "@services/modal/modal.service";
import { EModalType } from "@shared/constants/modal.constants";
import { Subscription } from "rxjs";

@Component({
	selector: "app-folders-page",
	imports: [SectionTitleComponent, FolderListComponent, TranslatePipe],
	templateUrl: "./folders-page.component.html",
})
export class FoldersPageComponent {
	private subscription = new Subscription();
	numberOfFolders = 0;

	constructor(private foldersService: FoldersService, private modalService: ModalService) {}

	ngOnInit() {
		this.subscription = this.foldersService.numberOfFolders$.subscribe((numberOfFolders) => {
			this.numberOfFolders = numberOfFolders;
		});
	}

	toggleIsAddFolderModalOpen(state: boolean) {
		this.modalService.toggleModal(EModalType.FolderAdding, state);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
