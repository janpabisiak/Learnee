import { Component, HostListener, inject, OnDestroy, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "@components/header/header.component";
import { MobileMenuComponent } from "@components/header/mobile-menu/mobile-menu.component";
import { AddEditWordModalComponent } from "@components/home-page/add-edit-word-modal/add-edit-word-modal.component";
import { AddEditFolderModalComponent } from "@components/folders-page/add-edit-folder-modal/add-edit-folder-modal.component";
import { ConfirmWordDeletionModalComponent } from "@components/home-page/confirm-word-deletion-modal/confirm-word-deletion-modal.component";
import { ConfirmFolderDeletionModalComponent } from "@components/folders-page/confirm-folder-deletion-modal/confirm-folder-deletion-modal.component";
import { SpinnerComponent } from "@shared/components/spinner/spinner.component";
import { ToasterContainerComponent } from "@shared/components/toaster-container/toaster-container.component";
import { EToasterPositions } from "@shared/constants/toaster.constants";
import { ModalService } from "@services/modal/modal.service";
import { EModalType } from "@shared/constants/modal.constants";
import { ToasterService } from "@services/toaster/toaster.service";
import { WordsService } from "@services/words/words.service";
import { Subscription } from "rxjs";
import { IToaster } from "../app/types/toaster.interface";
import { FooterComponent } from "@components/footer/footer.component";
import { SettingsService } from "@services/settings/settings.service";
import { ConfirmImportModalComponent } from "@components/settings-page/confirm-import-modal/confirm-import-modal.component";
import { AddToFolderModalComponent } from "@components/folders-page/add-to-folder-modal/add-to-folder-modal.component";

@Component({
	selector: "app-root",
	imports: [
		RouterModule,
		HeaderComponent,
		AddEditWordModalComponent,
		AddEditFolderModalComponent,
		ConfirmWordDeletionModalComponent,
		ConfirmFolderDeletionModalComponent,
		ConfirmImportModalComponent,
		ToasterContainerComponent,
		SpinnerComponent,
		MobileMenuComponent,
		FooterComponent,
		AddToFolderModalComponent,
	],
	templateUrl: "./app.component.html",
	standalone: true,
})
export class AppComponent implements OnInit, OnDestroy {
	private modalService = inject(ModalService);
	private toasterService = inject(ToasterService);
	private wordsService = inject(WordsService);
	private settingsService = inject(SettingsService);
	wordEditionModalOpen = false;
	isWordDeletingModalOpen = false;
	folderEditionModalOpen = false;
	isFolderDeletingModalOpen = false;
	addToFolderModalOpen = false;
	importConfirmationModalOpen = false;
	mobileNavbarOpen = false;
	isLoading = false;
	toasters: IToaster[] = [];
	EToasterPositions = EToasterPositions;
	private subscriptions = new Subscription();
	@HostListener("click", ["$event.target"])
	onClick(el: HTMLElement) {
		if (el.id === "mobile-menu-overlay") {
			this.modalService.toggleModal(EModalType.MobileNavbar, false);
		}
	}

	ngOnInit() {
		this.toasterService.startAutoRemoving();

		this.subscriptions.add(
			this.modalService.wordEditionModalOpen$.subscribe((isOpen) => {
				this.wordEditionModalOpen = isOpen;
			}),
		);

		this.subscriptions.add(
			this.modalService.wordDeletionModalOpen$.subscribe((isOpen) => {
				this.isWordDeletingModalOpen = isOpen;
			}),
		);

		this.subscriptions.add(
			this.modalService.folderEditionModalOpen$.subscribe((isOpen) => {
				this.folderEditionModalOpen = isOpen;
			}),
		);

		this.subscriptions.add(
			this.modalService.folderDeletionModalOpen$.subscribe((isOpen) => {
				this.isFolderDeletingModalOpen = isOpen;
			}),
		);

		this.subscriptions.add(
			this.modalService.addToFolderModalOpen$.subscribe((isOpen) => {
				this.addToFolderModalOpen = isOpen;
			}),
		);

		this.subscriptions.add(
			this.modalService.importConfirmationModalOpen$.subscribe((isOpen) => {
				this.importConfirmationModalOpen = isOpen;
			}),
		);

		this.subscriptions.add(
			this.modalService.mobileNavbarOpen$.subscribe((isOpen) => {
				this.mobileNavbarOpen = isOpen;
			}),
		);

		this.subscriptions.add(
			this.wordsService.isWotdLoading$.subscribe((loading) => {
				this.isLoading = loading;
			}),
		);

		this.subscriptions.add(
			this.toasterService.toasters$.subscribe((toasters) => {
				this.toasters = toasters;
			}),
		);

		this.settingsService.toggleDarkClass();
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}
}
