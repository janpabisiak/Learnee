import { inject, Injectable } from "@angular/core";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { ELocalStorageKeys } from "@shared/constants/local-storage.constants";
import {
	EAvailableLanguages,
	SettingsKeys,
	SaveSettingsInput,
	defaultSettings,
} from "@shared/constants/settings.constants";
import { SettingsStore } from "app/stores/settings/settings.store";

@Injectable({
	providedIn: "root",
})
export class SettingsResourceService {
	private settingsStore = inject(SettingsStore);
	private localStorageService = inject(LocalStorageService);

	private storeUpdaters: Record<SettingsKeys, (value: any) => void> = {
		[ELocalStorageKeys.DarkMode]: (value: boolean) => this.settingsStore.setIsDarkMode(value),
		[ELocalStorageKeys.FetchWordDefinition]: (value: boolean) =>
			this.settingsStore.setIsFetchWordDefinitionEnabled(value),
		[ELocalStorageKeys.Language]: (value: EAvailableLanguages) =>
			this.settingsStore.setLanguage(value),
		[ELocalStorageKeys.FetchWotd]: (value: boolean) =>
			this.settingsStore.setIsFetchWotdEnabled(value),
		[ELocalStorageKeys.StatisticsEnabled]: (value: boolean) =>
			this.settingsStore.setIsStatisticsEnabled(value),
	};

	load(): void {
		(Object.keys(this.storeUpdaters) as SettingsKeys[]).forEach((key) => {
			const defaultValue = defaultSettings[key];
			const savedValue = this.localStorageService.loadData(key);

			this.storeUpdaters[key](savedValue ?? defaultValue);
		});
	}

	save({ key, value }: SaveSettingsInput): void {
		this.localStorageService.saveData(key, value);
	}
}
