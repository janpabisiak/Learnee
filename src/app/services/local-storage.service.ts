import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class LocalStorageService {
	loadData(key: string) {
		const value = localStorage.getItem(key);

		if (value) return JSON.parse(value);
		return false;
	}

	saveData(key: string, value: {}) {
		localStorage.setItem(key, JSON.stringify(value));
	}
}
