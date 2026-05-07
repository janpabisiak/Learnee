import { NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from "@components/utils/button/button.component";
import { SectionTitleComponent } from "@components/utils/section-title/section-title.component";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { EModalType, ModalService } from "@services/modal/modal.service";
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
	EModalType = EModalType;
	private subscription = new Subscription();

	constructor(
		private settingsService: SettingsService,
		private localStorage: LocalStorageService,
		private translation: TranslateService,
		private modalService: ModalService,
	) {}

	ngOnInit() {
		this.subscription = combineLatest([
			this.settingsService.isDarkMode$,
			this.settingsService.isFetchWordDefinitionEnabled$,
			this.localStorage.hasKeys$,
			this.settingsService.currentLanguage$,
		]).subscribe(([isDarkMode, isFetchWordDefinitionEnabled, hasKeys, currentLanguage]) => {
			this.isDarkMode = isDarkMode;
			this.isFetchWordDefinitionEnabled = isFetchWordDefinitionEnabled;
			this.hasKeys = hasKeys;
			this.currentLanguage = currentLanguage;
		});

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

	onFileSelected(event: any) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e: any) => {
				try {
					const data = JSON.parse(e.target.result);
					this.localStorage.setImportedData(data);
					this.modalService.toggleModal(EModalType.ImportConfirmation, true);
				} catch (err) {
					console.error("Invalid JSON file", err);
				}
			};
			reader.readAsText(file);
		}
	}

	triggerFileInput() {
		const fileInput = document.getElementById("importFileInput") as HTMLInputElement;
		fileInput.click();
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
