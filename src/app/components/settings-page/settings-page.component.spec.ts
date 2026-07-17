import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SettingsPageComponent } from "./settings-page.component";
import { provideTranslateService } from "@ngx-translate/core";
import {
	createMockSettingsService,
	IMockSettingsService,
} from "@services/settings/settings.service.mock";
import {
	createMockLocalStorageService,
	IMockLocalStorageService,
} from "@services/local-storage/local-storage.service.mock";
import { createMockModalService, IMockModalService } from "@services/modal/modal.service.mock";
import { SettingsService } from "@services/settings/settings.service";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { ModalService } from "@services/modal/modal.service";
import { EAvailableLanguages } from "@shared/constants/settings.constants";
import { EModalType } from "@shared/constants/modal.constants";

describe("SettingsPageComponent", () => {
	let component: SettingsPageComponent;
	let fixture: ComponentFixture<SettingsPageComponent>;
	let mockSettingsService: IMockSettingsService;
	let mockLocalStorageService: IMockLocalStorageService;
	let mockModalService: IMockModalService;

	beforeEach(async () => {
		mockSettingsService = createMockSettingsService();
		mockLocalStorageService = createMockLocalStorageService();
		mockModalService = createMockModalService();

		await TestBed.configureTestingModule({
			imports: [SettingsPageComponent],
			providers: [
				{ provide: SettingsService, useValue: mockSettingsService },
				{ provide: LocalStorageService, useValue: mockLocalStorageService },
				{ provide: ModalService, useValue: mockModalService },
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

	it("should toggle dark mode on toggleDarkMode call", () => {
		component.toggleDarkMode(true);
		expect(mockSettingsService.setIsDarkMode).toHaveBeenCalledWith(true);
	});

	it("should toggle fetch word definition on toggleIsFetchWordDefinitionEnabled call", () => {
		component.toggleIsFetchWordDefinitionEnabled(false);
		expect(mockSettingsService.setIsFetchWordDefinitionEnabled).toHaveBeenCalledWith(false);
	});

	it("should toggle fetch wotd on toggleIsFetchWotdEnabled call", () => {
		component.toggleIsFetchWotdEnabled(true);
		expect(mockSettingsService.setIsFetchWotdEnabled).toHaveBeenCalledWith(true);
	});

	it("should toggle statistics on toggleIsStatisticsEnabled call", () => {
		component.toggleIsStatisticsEnabled(true);
		expect(mockSettingsService.setIsStatisticsEnabled).toHaveBeenCalledWith(true);
	});

	it("should set language on setLanguage call", () => {
		component.setLanguage("pl-PL");
		expect(mockSettingsService.setLanguage).toHaveBeenCalledWith(EAvailableLanguages.Polish);
	});

	it("should trigger exportData on exportData call", () => {
		component.exportData();
		expect(mockLocalStorageService.exportData).toHaveBeenCalled();
	});

	it("should trigger deleteData on deleteData call", () => {
		component.deleteData();
		expect(mockLocalStorageService.deleteData).toHaveBeenCalled();
	});

	it("should click the input element on triggerFileInput call", () => {
		const mockInput = document.createElement("input");
		spyOn(mockInput, "click");
		spyOn(document, "getElementById").and.returnValue(mockInput);

		component.triggerFileInput();

		expect(document.getElementById).toHaveBeenCalledWith("importFileInput");
		expect(mockInput.click).toHaveBeenCalled();
	});

	it("should read file and call setImportedData on onFileSelected", (done) => {
		const dummyData = { test: "data" };
		const file = new File([JSON.stringify(dummyData)], "settings.json", {
			type: "application/json",
		});
		const event = { target: { files: [file] } };

		component.onFileSelected(event);

		setTimeout(() => {
			expect(mockLocalStorageService.setImportedData).toHaveBeenCalledWith(dummyData);
			expect(mockModalService.toggleModal).toHaveBeenCalledWith(
				EModalType.ImportConfirmation,
				true,
			);
			done();
		}, 100);
	});
});
