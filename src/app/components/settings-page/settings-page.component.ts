import { NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from "@components/utils/button/button.component";
import { SectionTitleComponent } from "@components/utils/section-title/section-title.component";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { EAvailableLanguages, SettingsService } from "@services/settings/settings.service";
import { combineLatest, Subscription, take } from "rxjs";

@Component({
	selector: "app-settings-page",
	imports: [SectionTitleComponent, ButtonComponent, FormsModule, TranslatePipe, NgIf],
	templateUrl: "./settings-page.component.html",
})
export class SettingsPageComponent implements OnInit {
	isDarkMode = false;
	isFetchWordDefinitionEnabled = true;
	hasKeys = false;
	currentLanguage = EAvailableLanguages.English;
	translations: Record<string, string> | null = null;
	EAvailableLanguages = EAvailableLanguages;
	private subscription = new Subscription();

	constructor(
		private settingsService: SettingsService,
		private localStorage: LocalStorageService,
		private translation: TranslateService,
	) {}

	ngOnInit() {
		this.subscription = combineLatest([
			this.settingsService.isDarkMode$,
			this.settingsService.isFetchWordDefinitionEnabled$,
			this.localStorage.hasKeys$,
			this.settingsService.currentLanguage$,
		]).subscribe(
			([isDarkMode, isFetchWordDefinitionEnabled, hasKeys, currentLanguage]) => {
				this.isDarkMode = isDarkMode;
				this.isFetchWordDefinitionEnabled = isFetchWordDefinitionEnabled;
				this.hasKeys = hasKeys;
				this.currentLanguage = currentLanguage;
			},
		);

		this.translation
			.get("settings.title")
			.pipe(take(1))
			.subscribe((translations) => {
				this.translations = translations;
			});
	}

	toggleDarkMode() {
		this.settingsService.setIsDarkMode(this.isDarkMode);
	}

	toggleFetchWordDefinition() {
		this.settingsService.setIsFetchWordDefinitionEnabled(this.isFetchWordDefinitionEnabled);
	}

	setCurrentLanguage(e: any) {
		this.settingsService.setCurrentLanguage(e.target.value as EAvailableLanguages);
	}

	exportData() {
		this.localStorage.exportData();
	}

	deleteData() {
		this.localStorage.deleteData();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
