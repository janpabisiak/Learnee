import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SettingsPageComponent } from "./settings-page.component";
import { provideTranslateService } from "@ngx-translate/core";
import { createMockSettingsService, IMockSettingsService } from "@services/settings/settings.service.mock";
import {
	createMockLocalStorageService,
	IMockLocalStorageService,
} from "@services/local-storage/local-storage.service.mock";
import { SettingsService } from "@services/settings/settings.service";
import { LocalStorageService } from "@services/local-storage/local-storage.service";

describe("SettingsPageComponent", () => {
	let component: SettingsPageComponent;
	let fixture: ComponentFixture<SettingsPageComponent>;
	let mockSettingsService: IMockSettingsService;
	let mockLocalStorageService: IMockLocalStorageService;

	beforeEach(async () => {
		mockSettingsService = createMockSettingsService();
		mockLocalStorageService = createMockLocalStorageService();

		await TestBed.configureTestingModule({
			imports: [SettingsPageComponent],
			providers: [
				{ provide: SettingsService, useValue: mockSettingsService },
				{ provide: LocalStorageService, useValue: mockLocalStorageService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(SettingsPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
