import { TestBed } from "@angular/core/testing";
import { SettingsStore } from "./settings.store";
import { EAvailableLanguages } from "@shared/constants/settings.constants";
import { take } from "rxjs";

describe("SettingsStore", () => {
	let store: SettingsStore;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SettingsStore],
		});
		store = TestBed.inject(SettingsStore);
	});

	it("should be created", () => {
		expect(store).toBeTruthy();
	});

	it("should set and get isDarkMode", () => {
		expect(store.isDarkModeValue).toBeFalse();
		store.setIsDarkMode(true);
		expect(store.isDarkModeValue).toBeTrue();
	});

	it("should set isFetchWordDefinitionEnabled", (done) => {
		store.isFetchWordDefinitionEnabled$.pipe(take(1)).subscribe((val) => {
			expect(val).toBeFalse();
		});

		store.setIsFetchWordDefinitionEnabled(true);

		store.isFetchWordDefinitionEnabled$.pipe(take(1)).subscribe((val) => {
			expect(val).toBeTrue();
			done();
		});
	});

	it("should set isFetchWotdEnabled", (done) => {
		store.isFetchWotdEnabled$.pipe(take(1)).subscribe((val) => {
			expect(val).toBeFalse();
		});

		store.setIsFetchWotdEnabled(true);

		store.isFetchWotdEnabled$.pipe(take(1)).subscribe((val) => {
			expect(val).toBeTrue();
			done();
		});
	});

	it("should set isStatisticsEnabled", (done) => {
		store.isStatisticsEnabled$.pipe(take(1)).subscribe((val) => {
			expect(val).toBeFalse();
		});

		store.setIsStatisticsEnabled(true);

		store.isStatisticsEnabled$.pipe(take(1)).subscribe((val) => {
			expect(val).toBeTrue();
			done();
		});
	});

	it("should set and get language", () => {
		expect(store.languageValue).toBe(EAvailableLanguages.English);
		store.setLanguage(EAvailableLanguages.Polish);
		expect(store.languageValue).toBe(EAvailableLanguages.Polish);
	});

	describe("hasAnyWidgetVisible$", () => {
		it("should return false when both wotd and statistics are false", (done) => {
			store.setIsFetchWotdEnabled(false);
			store.setIsStatisticsEnabled(false);

			store.hasAnyWidgetVisible$.pipe(take(1)).subscribe((val) => {
				expect(val).toBeFalse();
				done();
			});
		});

		it("should return true when only wotd is true", (done) => {
			store.setIsFetchWotdEnabled(true);
			store.setIsStatisticsEnabled(false);

			store.hasAnyWidgetVisible$.pipe(take(1)).subscribe((val) => {
				expect(val).toBeTrue();
				done();
			});
		});

		it("should return true when only statistics is true", (done) => {
			store.setIsFetchWotdEnabled(false);
			store.setIsStatisticsEnabled(true);

			store.hasAnyWidgetVisible$.pipe(take(1)).subscribe((val) => {
				expect(val).toBeTrue();
				done();
			});
		});

		it("should return true when both are true", (done) => {
			store.setIsFetchWotdEnabled(true);
			store.setIsStatisticsEnabled(true);

			store.hasAnyWidgetVisible$.pipe(take(1)).subscribe((val) => {
				expect(val).toBeTrue();
				done();
			});
		});
	});
});
