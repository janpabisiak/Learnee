import { Injectable } from "@angular/core";
import { IToaster } from "../../types/toaster.interface";
import { BehaviorSubject } from "rxjs";
import { EToasterTypes } from "@components/utils/toaster-container/toaster/toaster.component";

@Injectable({
	providedIn: "root",
})
export class ToasterService {
	private toasters = new BehaviorSubject<IToaster[]>([]);
	toasters$ = this.toasters.asObservable();
	toasterTypes = EToasterTypes;

	addToaster({
		type = this.toasterTypes.Success,
		content,
		duration = 5,
	}: {
		type: EToasterTypes;
		content: string;
		duration: number;
	}) {
		const toaster = {
			id: this.toasters.value.length,
			type,
			content,
			duration,
			expirationTimestamp: new Date().getTime() + duration * 1000,
		};

		this.toasters.next([...this.toasters.value, toaster]);
	}

	startAutoRemoving() {
		setInterval(() => this.filterToasters, 1000);
	}

	private filterToasters() {
		const updatedToasters: IToaster[] = this.toasters.value.filter(
			(t) => t.expirationTimestamp > new Date().getTime() - 1
		);

		this.toasters.next(updatedToasters);
	}
}
