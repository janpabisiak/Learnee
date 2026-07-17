import { Injectable } from "@angular/core";
import { EAvailableLanguages } from "@shared/constants/settings.constants";
import { BehaviorSubject, combineLatest, map } from "rxjs";

@Injectable({ providedIn: "root" })
export class SettingsStore {
	private isDarkMode = new BehaviorSubject<boolean>(false);
	private isFetchWordDefinitionEnabled = new BehaviorSubject<boolean>(false);
	private isFetchWotdEnabled = new BehaviorSubject<boolean>(false);
	private isStatisticsEnabled = new BehaviorSubject<boolean>(false);
	private language = new BehaviorSubject<EAvailableLanguages>(EAvailableLanguages.English);

	isDarkMode$ = this.isDarkMode.asObservable();
	isFetchWordDefinitionEnabled$ = this.isFetchWordDefinitionEnabled.asObservable();
	isFetchWotdEnabled$ = this.isFetchWotdEnabled.asObservable();
	isStatisticsEnabled$ = this.isStatisticsEnabled.asObservable();
	language$ = this.language.asObservable();

	hasAnyWidgetVisible$ = combineLatest([
		this.isFetchWotdEnabled$,
		this.isStatisticsEnabled$,
	]).pipe(map((arr) => arr.some((visible) => visible === true)));

	setIsDarkMode(value: boolean): void {
		this.isDarkMode.next(value);
	}

	get isDarkModeValue(): boolean {
		return this.isDarkMode.value;
	}

	setIsFetchWordDefinitionEnabled(value: boolean): void {
		this.isFetchWordDefinitionEnabled.next(value);
	}

	setIsFetchWotdEnabled(value: boolean): void {
		this.isFetchWotdEnabled.next(value);
	}

	setIsStatisticsEnabled(value: boolean): void {
		this.isStatisticsEnabled.next(value);
	}

	setLanguage(value: EAvailableLanguages): void {
		this.language.next(value);
	}

	get languageValue(): EAvailableLanguages {
		return this.language.value;
	}
}
