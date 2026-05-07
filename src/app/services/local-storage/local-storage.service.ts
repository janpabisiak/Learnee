import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class LocalStorageService {
	private hasKeys = new BehaviorSubject<boolean>(false);
	private importedData: Record<string, any> | null = null;
	hasKeys$ = this.hasKeys.asObservable();

	loadData(key: string) {
		const data = localStorage.getItem(key);

		if (data !== null) {
			try {
				return JSON.parse(data);
			} catch (e) {
				console.error("Failed to parse JSON:", e);
				return data;
			}
		}

		return null;
	}

	saveData(key: string, value: {}) {
		localStorage.setItem(key, JSON.stringify(value));
		this.hasKeys.next(true);
	}

	exportData() {
		const localStorageAsJson = this.getLocalStorageAsJson();
		this.downloadData(localStorageAsJson);
	}

	deleteData() {
		localStorage.clear();
		this.hasKeys.next(false);
		window.location.reload();
	}

	setImportedData(data: Record<string, any> | null) {
		this.importedData = data;
	}

	getImportedData() {
		return this.importedData;
	}

	importData(data: Record<string, any>) {
		localStorage.clear();

		Object.entries(data).forEach(([key, value]) => {
			localStorage.setItem(key, JSON.stringify(value));
		});

		this.hasKeys.next(Object.keys(data).length > 0);
		window.location.reload();
	}

	private getLocalStorageAsJson() {
		const data: Record<string, string> = {};

		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i)!;
			if (!key && key === "key") continue;

			data[key] = this.loadData(key);
		}

		return JSON.stringify(data, null, 2);
	}

	private downloadData(data: string) {
		const blob = new Blob([data], { type: "application/json" });
		const fileURL = URL.createObjectURL(blob);

		const downloadLink = document.createElement("a");
		downloadLink.href = fileURL;
		downloadLink.download = "data.json";
		downloadLink.classList.add("hidden");

		document.body.appendChild(downloadLink);
		downloadLink.click();

		URL.revokeObjectURL(fileURL);
	}
}
