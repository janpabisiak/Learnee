import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
	providedIn: "root",
})
export class LevelService {
	private expPoints = new BehaviorSubject<number>(0);
	private level = new BehaviorSubject<number>(0);
	private statistics = new BehaviorSubject<Map<string, number>>(new Map<string, number>());
	expPoints$ = this.expPoints.asObservable();
	level$ = this.level.asObservable();
	statistics$ = this.statistics.asObservable();

	constructor(private localStorageService: LocalStorageService) {
		const statistics = this.localStorageService.loadData("statistics");
		const expPoints = this.localStorageService.loadData("exp-points");

		if (statistics) {
			this.statistics.next(statistics);
		}

		if (expPoints) {
			this.expPoints.next(expPoints);
		}

		this.addMissingDatesToStatistics();
		this.calcLevel();
	}

	addExpPoints(amount: number) {
		this.expPoints.next(this.expPoints.value + amount);
		this.updateExpPoints();
	}

	removeExpPoints(amount: number) {
		const currentExpPoints = this.expPoints.value;
		if (currentExpPoints < amount) return;

		this.expPoints.next(this.expPoints.value - amount);
		this.updateExpPoints();
	}

	private calcLevel() {
		this.level.next(Math.floor(this.expPoints.value / 2));
	}

	private updateExpPoints() {
		this.calcLevel();
		this.localStorageService.saveData("exp-points", this.expPoints.value);
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
		statistics.set(today.toISOString(), currentDay! + 1);

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
