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
import { ModalService } from "@services/modal.service";
import { ToasterService } from "@services/toaster.service";
import { WordsService } from "@services/words.service";
import { Subscription } from "rxjs";
import { IToaster } from "../app/types/toaster.interface";

@Component({
	selector: "app-root",
	imports: [
		RouterModule,
		HeaderComponent,
		AddEditWordModalComponent,
		ConfirmWordDeletionModalComponent,
		ToasterContainerComponent,
		SpinnerComponent,
		MobileMenuComponent,
	],
	templateUrl: "./app.component.html",
	standalone: true,
})
export class AppComponent implements OnInit, OnDestroy {
	modalService = inject(ModalService);
	toasterService = inject(ToasterService);
	wordsService = inject(WordsService);
	isWordAddingModalOpen = false;
	isWordDeletingModalOpen = false;
	isMobileNavbarOpen = false;
	isLoading = true;
	toasters: IToaster[] = [];
	EToasterPositions = EToasterPositions;
	private subscriptions = new Subscription();
	@HostListener("click", ["$event.target"])
	onClick(el: HTMLElement) {
		if (el.id === "mobile-menu-overlay") {
			this.modalService.toggleIsMobileNavbarOpen(false);
		}
	}

	ngOnInit() {
		this.toasterService.startAutoRemoving();

		this.subscriptions.add(
			this.modalService.isWordAddingModalOpen$.subscribe((isOpen) => {
				this.isWordAddingModalOpen = isOpen;
			})
		);

		this.subscriptions.add(
			this.modalService.isWordDeletionModalOpen$.subscribe((isOpen) => {
				this.isWordDeletingModalOpen = isOpen;
			})
		);

		this.subscriptions.add(
			this.modalService.isMobileNavbarOpen$.subscribe((isOpen) => {
				this.isMobileNavbarOpen = isOpen;
			})
		);

		this.subscriptions.add(
			this.wordsService.wordsOfTheDay$.subscribe((wordsOfTheDay) => {
				this.isLoading = !wordsOfTheDay.length;
			})
		);

		this.subscriptions.add(
			this.toasterService.toasters$.subscribe((toasters) => {
				this.toasters = toasters;
			})
		);
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}
}
