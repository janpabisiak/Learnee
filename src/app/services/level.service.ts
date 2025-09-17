import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
	providedIn: "root",
})
export class LevelService {
	private xpPoints = new BehaviorSubject<number>(0);
	private level = new BehaviorSubject<number>(0);
	private statistics = new BehaviorSubject<Map<string, number>>(new Map<string, number>());
	xpPoints$ = this.xpPoints.asObservable();
	level$ = this.level.asObservable();
	statistics$ = this.statistics.asObservable();

	constructor(private localStorageService: LocalStorageService) {
		const statistics = this.localStorageService.loadData("statistics");
		const xpPoints = this.localStorageService.loadData("xp-points");

		if (statistics) {
			this.statistics.next(statistics);
		}

		if (xpPoints) {
			this.xpPoints.next(xpPoints);
		}

		this.addMissingDatesToStatistics();
		this.calcLevel();
	}

	addXpPoints(amount: number) {
		this.xpPoints.next(this.xpPoints.value + amount);
		this.updateXpPoints();
	}

	removeXpPoints(amount: number) {
		const currentXpPoints = this.xpPoints.value;
		if (currentXpPoints < amount) {
			this.xpPoints.next(0);
		} else {
			this.xpPoints.next(currentXpPoints - amount);
		}

		this.updateXpPoints();
	}

	private calcLevel() {
		let xp = this.xpPoints.value;
		let level = 0;
		let requiredXp = 50;

		while (xp > requiredXp) {
			level++;
			xp -= requiredXp;
			requiredXp += 50;
		}

		this.level.next(level);
	}

	calcNeededXp(level: number, xp: number = 0): number {
		if (level === 0) return xp;

		return this.calcNeededXp(level - 1, xp + level * 50);
	}

	private updateXpPoints() {
		this.calcLevel();
		this.localStorageService.saveData("xp-points", this.xpPoints.value);
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
