import { inject, Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { SettingsResourceService } from "@services/settings-resource/settings-resource.service";
import { ELocalStorageKeys } from "@shared/constants/local-storage.constants";
import { EAvailableLanguages } from "@shared/constants/settings.constants";
import { SettingsStore } from "app/stores/settings/settings.store";

@Injectable({
	providedIn: "root",
})
export class SettingsService {
	private settingsStore = inject(SettingsStore);
	private rendererFactory = inject(RendererFactory2);
	private localStorageService = inject(LocalStorageService);
	private translateService = inject(TranslateService);
	private settingsResourceService = inject(SettingsResourceService);
	private renderer: Renderer2;

	isDarkMode$ = this.settingsStore.isDarkMode$;
	isFetchWordDefinitionEnabled$ = this.settingsStore.isFetchWordDefinitionEnabled$;
	isFetchWotdEnabled$ = this.settingsStore.isFetchWotdEnabled$;
	isStatisticsEnabled$ = this.settingsStore.isStatisticsEnabled$;
	language$ = this.settingsStore.language$;
	hasAnyWidgetVisible$ = this.settingsStore.hasAnyWidgetVisible$;

	constructor() {
		this.renderer = this.rendererFactory.createRenderer(null, null);

		this.settingsResourceService.load();
		this.translateService.use(this.settingsStore.languageValue);
	}

	setIsDarkMode(value: boolean): void {
		this.settingsStore.setIsDarkMode(value);
		this.settingsResourceService.save({ key: ELocalStorageKeys.DarkMode, value });

		this.toggleDarkClass();
	}

	setIsFetchWordDefinitionEnabled(value: boolean): void {
		this.settingsStore.setIsFetchWordDefinitionEnabled(value);
		this.settingsResourceService.save({ key: ELocalStorageKeys.FetchWordDefinition, value });
	}

	setIsFetchWotdEnabled(value: boolean): void {
		this.settingsStore.setIsFetchWotdEnabled(value);
		this.settingsResourceService.save({ key: ELocalStorageKeys.FetchWotd, value });
	}

	setIsStatisticsEnabled(value: boolean): void {
		this.settingsStore.setIsStatisticsEnabled(value);
		this.settingsResourceService.save({ key: ELocalStorageKeys.StatisticsEnabled, value });
	}

	setLanguage(value: EAvailableLanguages): void {
		this.settingsStore.setLanguage(value);
		this.localStorageService.saveData(ELocalStorageKeys.Language, value);

		this.translateService.use(this.settingsStore.languageValue);
	}

	toggleDarkClass(): void {
		this.settingsStore.isDarkModeValue
			? this.renderer.addClass(document.body, "dark")
			: this.renderer.removeClass(document.body, "dark");
	}
}
