import { Injectable } from "@angular/core";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class LevelService {
	private xpPoints = new BehaviorSubject<number>(0);
	private level = new BehaviorSubject<number>(0);
	xpPoints$ = this.xpPoints.asObservable();
	level$ = this.level.asObservable();

	constructor(private localStorageService: LocalStorageService) {
		const xpPoints = this.localStorageService.loadData("xp-points");

		if (xpPoints) {
			this.xpPoints.next(xpPoints);
		}

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
}
