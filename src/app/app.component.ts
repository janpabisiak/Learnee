import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AddEditWordModalComponent } from "@components/home-page/add-edit-word-modal/add-edit-word-modal.component";
import { HeaderComponent } from "@components/header/header.component";
import { ModalService } from "@services/modal.service";
import { Subscription } from "rxjs";
import { ConfirmWordDeletionModalComponent } from "@components/home-page/confirm-word-deletion-modal/confirm-word-deletion-modal.component";
import {
	EToasterPositions,
	ToasterContainerComponent,
} from "@components/utils/toaster-container/toaster-container.component";
import { ToasterService } from "@services/toaster.service";
import { IToaster } from "../app/types/toaster.interface";

@Component({
	selector: "app-root",
	imports: [
		RouterModule,
		HeaderComponent,
		AddEditWordModalComponent,
		ConfirmWordDeletionModalComponent,
		ToasterContainerComponent,
	],
	templateUrl: "./app.component.html",
	standalone: true,
})
export class AppComponent implements OnInit, OnDestroy {
	modalService = inject(ModalService);
	toasterService = inject(ToasterService);
	subscriptions = new Subscription();
	isWordAddingModalOpen = false;
	isWordDeletingModalOpen = false;
	toasters: IToaster[] = [];
	EToasterPositions = EToasterPositions;

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
			this.toasterService.toasters$.subscribe((toasters) => {
				this.toasters = toasters;
				console.log(toasters);
			})
		);
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}
}
