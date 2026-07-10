import { Injectable } from "@angular/core";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { BehaviorSubject } from "rxjs";
import { ELocalStorageKeys } from "@shared/constants/local-storage.constants";
import { INITIAL_REQUIRED_XP, XP_INCREMENT_PER_LEVEL } from "@shared/constants/level.constants";

@Injectable({
	providedIn: "root",
})
export class LevelService {
	private xpPoints = new BehaviorSubject<number>(0);
	private level = new BehaviorSubject<number>(0);
	xpPoints$ = this.xpPoints.asObservable();
	level$ = this.level.asObservable();

	constructor(private localStorageService: LocalStorageService) {
		const xpPoints = this.localStorageService.loadData(ELocalStorageKeys.XpPoints);

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
		let requiredXp = INITIAL_REQUIRED_XP;

		while (xp > requiredXp) {
			level++;
			xp -= requiredXp;
			requiredXp += XP_INCREMENT_PER_LEVEL;
		}

		this.level.next(level);
	}

	calcNeededXp(level: number, xp: number = 0): number {
		if (level === 0) return xp;

		return this.calcNeededXp(level - 1, xp + level * XP_INCREMENT_PER_LEVEL);
	}

	private updateXpPoints() {
		this.calcLevel();
		this.localStorageService.saveData(ELocalStorageKeys.XpPoints, this.xpPoints.value);
	}
}
