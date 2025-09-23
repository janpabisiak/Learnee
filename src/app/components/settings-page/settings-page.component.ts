import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from "@components/utils/button/button.component";
import { SectionTitleComponent } from "@components/utils/section-title/section-title.component";
import { LocalStorageService } from "@services/local-storage.service";
import { SettingsService } from "@services/settings.service";
import { combineLatest, Subscription } from "rxjs";

@Component({
	selector: "app-settings-page",
	imports: [SectionTitleComponent, ButtonComponent, FormsModule],
	templateUrl: "./settings-page.component.html",
})
export class SettingsPageComponent implements OnInit {
	isDarkMode = false;
	hasKeys = false;
	private subscription = new Subscription();

	constructor(
		private settingsService: SettingsService,
		private localStorage: LocalStorageService
	) {}

	ngOnInit() {
		this.subscription = combineLatest([
			this.settingsService.isDarkMode$,
			this.localStorage.hasKeys$,
		]).subscribe(([isDarkMode, hasKeys]) => {
			this.isDarkMode = isDarkMode;
			this.hasKeys = hasKeys;
		});
	}

	toggleDarkMode() {
		this.settingsService.setIsDarkMode(this.isDarkMode);
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
