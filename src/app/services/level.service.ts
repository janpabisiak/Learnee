import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
	providedIn: "root",
})
export class LevelService {
	private expPointsSubject = new BehaviorSubject<number>(0);
	private levelSubject = new BehaviorSubject<number>(0);
	expPoints$ = this.expPointsSubject.asObservable();
	level$ = this.levelSubject.asObservable();

	constructor(private localStorageService: LocalStorageService) {
		const savedData = this.localStorageService.loadData("exp-points");
		if (!savedData) return;

		this.expPointsSubject.next(savedData);
		this.calcLevel();
	}

	addExpPoints(amount: number) {
		this.expPointsSubject.next(this.expPointsSubject.value + amount);
		this.updateState();
	}

	removeExpPoints(amount: number) {
		const currentExpPoints = this.expPointsSubject.value;
		if (currentExpPoints < amount) return;

		this.expPointsSubject.next(this.expPointsSubject.value - amount);
		this.updateState();
	}

	private calcLevel() {
		this.levelSubject.next(Math.floor(this.expPointsSubject.value / 2));
	}

	private updateState() {
		this.calcLevel();
		this.saveData();
	}

	private saveData() {
		this.localStorageService.saveData("exp-points", this.expPointsSubject.value);
	}
}
