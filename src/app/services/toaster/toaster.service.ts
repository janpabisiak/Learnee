import { Injectable } from "@angular/core";
import { IToaster } from "../../types/toaster.interface";
import { BehaviorSubject } from "rxjs";
import {
	DEFAULT_TOASTER_DURATION,
	EToasterTypes,
	TOASTER_CLEANUP_INTERVAL,
} from "@shared/constants/toaster.constants";

const MILLISECONDS_IN_SECOND = 1000;

@Injectable({
	providedIn: "root",
})
export class ToasterService {
	private toasters = new BehaviorSubject<IToaster[]>([]);
	toasters$ = this.toasters.asObservable();
	toasterTypes = EToasterTypes;
	private nextId = 0;

	addToaster({
		type = this.toasterTypes.Success,
		content,
		duration = DEFAULT_TOASTER_DURATION,
	}: {
		type: EToasterTypes;
		content: string;
		duration: number;
	}) {
		this.toasters.next([
			{
				id: this.nextId++,
				type,
				content,
				duration,
				expirationTimestamp: new Date().getTime() + duration * MILLISECONDS_IN_SECOND,
			},
			...this.toasters.value,
		]);
	}

	startAutoRemoving() {
		setInterval(() => this.filterToasters(), TOASTER_CLEANUP_INTERVAL);
	}

	private filterToasters() {
		const updatedToasters: IToaster[] = this.toasters.value.filter(
			(t) => t.expirationTimestamp > new Date().getTime() - 1,
		);

		this.toasters.next(updatedToasters);
	}
}
