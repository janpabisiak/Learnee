import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class SettingsService {
	private isDarkMode = new BehaviorSubject<boolean>(false);
	private renderer: Renderer2;

	isDarkMode$ = this.isDarkMode.asObservable();

	constructor(
		rendererFactory: RendererFactory2,
		private localStorageService: LocalStorageService
	) {
		this.renderer = rendererFactory.createRenderer(null, null);
		this.isDarkMode.next(this.localStorageService.loadData("dark-mode"));
		this.toggleDarkClass();
	}

	setIsDarkMode(value: boolean) {
		this.isDarkMode.next(value);
		this.localStorageService.saveData("dark-mode", value);
		this.toggleDarkClass();
	}

	toggleDarkClass() {
		this.isDarkMode.value
			? this.renderer.addClass(document.body, "dark")
			: this.renderer.removeClass(document.body, "dark");
	}
}
