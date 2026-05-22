import { Injectable } from "@angular/core";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { BehaviorSubject } from "rxjs";
import { ELocalStorageKeys } from "@shared/constants/local-storage.constants";
import { STATISTICS_DAYS_LIMIT } from "@shared/constants/statistics.constants";

@Injectable({
	providedIn: "root",
})
export class StatisticsService {
	private statistics = new BehaviorSubject<Map<string, number>>(new Map<string, number>());
	statistics$ = this.statistics.asObservable();

	constructor(private localStorageService: LocalStorageService) {
		const statistics = this.localStorageService.loadData(ELocalStorageKeys.Statistics);

		if (statistics) {
			this.statistics.next(new Map(statistics));
		}

		this.addMissingDatesToStatistics();
	}

	private addMissingDatesToStatistics() {
		const today = new Date();
		const statistics = new Map(this.statistics.value);

		// only last days limit
		for (let daysToGo = STATISTICS_DAYS_LIMIT - 1; daysToGo >= 0; daysToGo--) {
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
		// keep only the last days limit
		const allDates = Array.from(statistics.keys()).sort(
			(a, b) => new Date(a).getTime() - new Date(b).getTime()
		);
		const lastLimit = allDates.slice(-STATISTICS_DAYS_LIMIT);
		const trimmedMap = new Map(lastLimit.map((d) => [d, statistics.get(d)!]));

		this.statistics.next(trimmedMap);
		this.localStorageService.saveData(
			ELocalStorageKeys.Statistics,
			Array.from(trimmedMap.entries()),
		);
	}
}

export interface IStatistics {
	date: string;
	numberOfPlays: number;
}
