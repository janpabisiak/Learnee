import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AddWordModalComponent } from "@components/add-word-modal/add-word-modal.component";
import { HeaderComponent } from "@components/header/header.component";
import { ModalService } from "@services/modal.service";
import { Subscription } from "rxjs";

@Component({
	selector: "app-root",
	imports: [RouterModule, HeaderComponent, AddWordModalComponent],
	templateUrl: "./app.component.html",
	standalone: true,
})
export class AppComponent implements OnInit, OnDestroy {
	modalService = inject(ModalService);
	subscriptions = new Subscription();
	isWordAddingModalOpen = false;

	ngOnInit() {
		this.subscriptions.add(
			this.modalService.isWordAddingModalOpen$.subscribe((isWordAddingModalOpen) => {
				this.isWordAddingModalOpen = isWordAddingModalOpen;
			})
		);
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}
}
