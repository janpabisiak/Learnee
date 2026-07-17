import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslatePipe } from "@ngx-translate/core";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { ModalService } from "@services/modal/modal.service";
import { SettingsService } from "@services/settings/settings.service";
import { ButtonComponent } from "@shared/components/button/button.component";
import { SectionTitleComponent } from "@shared/components/section-title/section-title.component";
import { EModalType } from "@shared/constants/modal.constants";
import { EAvailableLanguages } from "@shared/constants/settings.constants";

@Component({
	selector: "app-settings-page",
	imports: [SectionTitleComponent, ButtonComponent, FormsModule, TranslatePipe, AsyncPipe],
	templateUrl: "./settings-page.component.html",
})
export class SettingsPageComponent {
	private settingsService = inject(SettingsService);
	private localStorage = inject(LocalStorageService);
	private modalService = inject(ModalService);

	isDarkMode$ = this.settingsService.isDarkMode$;
	isFetchWordDefinitionEnabled$ = this.settingsService.isFetchWordDefinitionEnabled$;
	isFetchWotdEnabled$ = this.settingsService.isFetchWotdEnabled$;
	isStatisticsEnabled$ = this.settingsService.isStatisticsEnabled$;
	language$ = this.settingsService.language$;
	hasKeys$ = this.localStorage.hasKeys$;

	toggleDarkMode(value: boolean) {
		this.settingsService.setIsDarkMode(value);
	}

	toggleIsFetchWordDefinitionEnabled(value: boolean) {
		this.settingsService.setIsFetchWordDefinitionEnabled(value);
	}

	toggleIsFetchWotdEnabled(value: boolean) {
		this.settingsService.setIsFetchWotdEnabled(value);
	}

	toggleIsStatisticsEnabled(value: boolean) {
		this.settingsService.setIsStatisticsEnabled(value);
	}

	setLanguage(value: string) {
		this.settingsService.setLanguage(value as EAvailableLanguages);
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
}
