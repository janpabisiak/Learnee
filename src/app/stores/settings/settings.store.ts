import { Injectable } from "@angular/core";
import { EAvailableLanguages } from "@shared/constants/settings.constants";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class SettingsStore {
	private isDarkMode = new BehaviorSubject<boolean>(false);
	private isFetchWordDefinitionEnabled = new BehaviorSubject<boolean>(false);
	private language = new BehaviorSubject<EAvailableLanguages>(EAvailableLanguages.English);

	isDarkMode$ = this.isDarkMode.asObservable();
	isFetchWordDefinitionEnabled$ = this.isFetchWordDefinitionEnabled.asObservable();
	language$ = this.language.asObservable();

	setIsDarkMode(value: boolean): void {
		this.isDarkMode.next(value);
	}

	get isDarkModeValue(): boolean {
		return this.isDarkMode.value;
	}

	setIsFetchWordDefinitionEnabled(value: boolean): void {
		this.isFetchWordDefinitionEnabled.next(value);
	}

	setLanguage(value: EAvailableLanguages): void {
		this.language.next(value);
	}

	get languageValue(): EAvailableLanguages {
		return this.language.value;
	}
}
