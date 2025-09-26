import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class LocalStorageService {
	private hasKeys = new BehaviorSubject<boolean>(false);

	hasKeys$ = this.hasKeys.asObservable();

	loadData(key: string) {
		const value = localStorage.getItem(key);

		if (value) return JSON.parse(value);
		return false;
	}

	saveData(key: string, value: {}) {
		localStorage.setItem(key, JSON.stringify(value));
		this.hasKeys.next(true);
	}

	exportData() {
		const data: Record<string, string> = {};

		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i)!;
			if (!key && key === "key") continue;

			data[key] = this.loadData(key);
		}

		const json = JSON.stringify(data, null, 2);

		const blob = new Blob([json], { type: "application/json" });
		const fileURL = URL.createObjectURL(blob);

		const downloadLink = document.createElement("a");
		downloadLink.href = fileURL;
		downloadLink.download = "data.json";
		downloadLink.classList.add("hidden");

		document.body.appendChild(downloadLink);
		downloadLink.click();

		URL.revokeObjectURL(fileURL);
	}

	deleteData() {
		localStorage.clear();
		this.hasKeys.next(false);
	}
}
