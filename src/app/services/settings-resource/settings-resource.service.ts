import { inject, Injectable } from "@angular/core";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { ELocalStorageKeys } from "@shared/constants/local-storage.constants";
import { EAvailableLanguages } from "@shared/constants/settings.constants";
import { SettingsStore } from "app/stores/settings/settings.store";

type SaveInput =
	| { key: ELocalStorageKeys.DarkMode; value: boolean }
	| { key: ELocalStorageKeys.FetchWordDefinition; value: boolean }
	| { key: ELocalStorageKeys.Language; value: EAvailableLanguages };

@Injectable({
	providedIn: "root",
})
export class SettingsResourceService {
	private settingsStore = inject(SettingsStore);
	private localStorageService = inject(LocalStorageService);

	load(): void {
		const isDarkMode = this.localStorageService.loadData(ELocalStorageKeys.DarkMode) ?? false;
		const isFetchWordDefinitionEnabled =
			this.localStorageService.loadData(ELocalStorageKeys.FetchWordDefinition) ?? true;
		const language =
			this.localStorageService.loadData(ELocalStorageKeys.Language) ||
			EAvailableLanguages.English;

		this.settingsStore.setIsDarkMode(isDarkMode);
		this.settingsStore.setIsFetchWordDefinitionEnabled(isFetchWordDefinitionEnabled);
		this.settingsStore.setLanguage(language);
	}

	save({ key, value }: SaveInput): void {
		this.localStorageService.saveData(key, value);
	}
}
