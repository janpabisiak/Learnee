import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { BehaviorSubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
	providedIn: "root",
})
export class SettingsService {
	private isDarkMode = new BehaviorSubject<boolean>(false);
	private isFetchWordDefinitionEnabled = new BehaviorSubject<boolean>(true);
	private currentLanguage = new BehaviorSubject<EAvailableLanguages>(EAvailableLanguages.English);
	private renderer: Renderer2;

	isDarkMode$ = this.isDarkMode.asObservable();
	isFetchWordDefinitionEnabled$ = this.isFetchWordDefinitionEnabled.asObservable();
	currentLanguage$ = this.currentLanguage.asObservable();

	constructor(
		rendererFactory: RendererFactory2,
		private localStorageService: LocalStorageService,
		private translation: TranslateService,
	) {
		this.renderer = rendererFactory.createRenderer(null, null);

		this.isDarkMode.next(this.localStorageService.loadData("dark-mode") ?? false);
		this.toggleDarkClass();

		this.isFetchWordDefinitionEnabled.next(
			this.localStorageService.loadData("fetch-word-definition") ?? true,
		);

		this.currentLanguage.next(
			this.localStorageService.loadData("language") || EAvailableLanguages.English,
		);
		this.translation.use(this.currentLanguage.value);
	}

	setIsDarkMode(value: boolean) {
		this.isDarkMode.next(value);
		this.localStorageService.saveData("dark-mode", value);
		this.toggleDarkClass();
	}

	setIsFetchWordDefinitionEnabled(value: boolean) {
		this.isFetchWordDefinitionEnabled.next(value);
		this.localStorageService.saveData("fetch-word-definition", value);
	}

	setCurrentLanguage(value: EAvailableLanguages) {
		this.currentLanguage.next(value);
		this.localStorageService.saveData("language", value);
		this.translation.use(this.currentLanguage.value);
	}

	toggleDarkClass() {
		this.isDarkMode.value
			? this.renderer.addClass(document.body, "dark")
			: this.renderer.removeClass(document.body, "dark");
	}
}

export enum EAvailableLanguages {
	English = "en-US",
	Polish = "pl-PL",
}
