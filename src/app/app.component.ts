import { Component, HostListener, inject, OnDestroy, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "@components/header/header.component";
import { MobileMenuComponent } from "@components/header/mobile-menu/mobile-menu.component";
import { AddEditWordModalComponent } from "@components/home-page/add-edit-word-modal/add-edit-word-modal.component";
import { ConfirmWordDeletionModalComponent } from "@components/home-page/confirm-word-deletion-modal/confirm-word-deletion-modal.component";
import { SpinnerComponent } from "@components/utils/spinner/spinner.component";
import {
	EToasterPositions,
	ToasterContainerComponent,
} from "@components/utils/toaster-container/toaster-container.component";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { ToasterService } from "@services/toaster/toaster.service";
import { WordsService } from "@services/words/words.service";
import { Subscription } from "rxjs";
import { IToaster } from "../app/types/toaster.interface";
import { FooterComponent } from "@components/footer/footer.component";
import { SettingsService } from "@services/settings/settings.service";
import { ConfirmImportModalComponent } from "@components/settings-page/confirm-import-modal/confirm-import-modal.component";

@Component({
	selector: "app-root",
	imports: [
		RouterModule,
		HeaderComponent,
		AddEditWordModalComponent,
		ConfirmWordDeletionModalComponent,
		ConfirmImportModalComponent,
		ToasterContainerComponent,
		SpinnerComponent,
		MobileMenuComponent,
		FooterComponent,
	],
	templateUrl: "./app.component.html",
	standalone: true,
})
export class AppComponent implements OnInit, OnDestroy {
	private modalService = inject(ModalService);
	private toasterService = inject(ToasterService);
	private wordsService = inject(WordsService);
	private settingsService = inject(SettingsService);
	isWordAddingModalOpen = false;
	isWordDeletingModalOpen = false;
	isImportConfirmationModalOpen = false;
	isMobileNavbarOpen = false;
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
			this.modalService.isWordAddingModalOpen$.subscribe((isOpen) => {
				this.isWordAddingModalOpen = isOpen;
			}),
		);

		this.subscriptions.add(
			this.modalService.isWordDeletionModalOpen$.subscribe((isOpen) => {
				this.isWordDeletingModalOpen = isOpen;
			}),
		);

		this.subscriptions.add(
			this.modalService.isImportConfirmationModalOpen$.subscribe((isOpen) => {
				this.isImportConfirmationModalOpen = isOpen;
			}),
		);

		this.subscriptions.add(
			this.modalService.isMobileNavbarOpen$.subscribe((isOpen) => {
				this.isMobileNavbarOpen = isOpen;
			}),
		);

		this.subscriptions.add(
			this.wordsService.wordsOfTheDay$.subscribe((wordsOfTheDay) => {
				this.isLoading = !wordsOfTheDay.length;
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
