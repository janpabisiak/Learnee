import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ModalService {
	private isWordAddingModalOpen = new BehaviorSubject<boolean>(false);
	private isWordDeletionModalOpen = new BehaviorSubject<boolean>(false);
	isWordAddingModalOpen$ = this.isWordAddingModalOpen.asObservable();
	isWordDeletionModalOpen$ = this.isWordDeletionModalOpen.asObservable();

	toggleShowWordAddingModal(state: boolean) {
		this.isWordAddingModalOpen.next(state);
	}

	toggleShowWordDeletionModal(state: boolean) {
		this.isWordDeletionModalOpen.next(state);
	}
}
