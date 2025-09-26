import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { routes } from "./app.routes";

import localeEn from "@angular/common/locales/en";
import localePl from "@angular/common/locales/pl";
import { registerLocaleData } from "@angular/common";
registerLocaleData(localeEn);
registerLocaleData(localePl);

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideHttpClient(),
		provideTranslateService({
			loader: provideTranslateHttpLoader({
				prefix: "./i18n/",
				suffix: ".json",
			}),
			fallbackLang: "en-US",
		}),
	],
};
