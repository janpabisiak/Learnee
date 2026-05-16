import { Injectable } from "@angular/core";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class StatisticsService {
	private statistics = new BehaviorSubject<Map<string, number>>(new Map<string, number>());
	statistics$ = this.statistics.asObservable();

	constructor(private localStorageService: LocalStorageService) {
		const statistics = this.localStorageService.loadData("statistics");

		if (statistics) {
			this.statistics.next(new Map(statistics));
		}

		this.addMissingDatesToStatistics();
	}

	private addMissingDatesToStatistics() {
		const today = new Date();
		const statistics = new Map(this.statistics.value);

		// only 30 last days
		for (let daysToGo = 29; daysToGo >= 0; daysToGo--) {
			const date = new Date();
			date.setDate(today.getDate() - daysToGo);
			date.setUTCHours(0, 0, 0, 0);
			const dateString = date.toISOString();

			if (statistics.has(dateString)) continue;

			statistics.set(dateString, 0);
		}

		this.updateStatistics(statistics);
	}

	registerGame() {
		const today = new Date();
		today.setUTCHours(0, 0, 0, 0);
		const statistics = new Map(this.statistics.value);

		const currentDay = statistics.get(today.toISOString());
		statistics.set(today.toISOString(), (currentDay || 0) + 1);

		this.updateStatistics(statistics);
	}

	private updateStatistics(statistics: Map<string, number>) {
		// keep only the last 30 days
		const allDates = Array.from(statistics.keys()).sort(
			(a, b) => new Date(a).getTime() - new Date(b).getTime()
		);
		const last30 = allDates.slice(-30);
		const trimmedMap = new Map(last30.map((d) => [d, statistics.get(d)!]));

		this.statistics.next(trimmedMap);
		this.localStorageService.saveData("statistics", Array.from(trimmedMap.entries()));
	}
}

export interface IStatistics {
	date: string;
	numberOfPlays: number;
}
