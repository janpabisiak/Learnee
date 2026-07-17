import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { HomePageComponent } from "./home-page.component";
import { WordListComponent } from "./word-list/word-list.component";
import { WordsOfTheDayComponent } from "./words-of-the-day/words-of-the-day.component";
import { UserStatisticsComponent } from "./user-statistics/user-statistics.component";
import { ButtonComponent } from "@shared/components/button/button.component";
import { createMockModalService, IMockModalService } from "@services/modal/modal.service.mock";
import {
	createMockWordsService,
	IMockWordsService,
	mockWords,
} from "@services/words/words.service.mock";
import { createMockSettingsService, IMockSettingsService } from "@services/settings/settings.service.mock";
import { ModalService } from "@services/modal/modal.service";
import { WordsService } from "@services/words/words.service";
import { SettingsService } from "@services/settings/settings.service";
import { EModalType } from "@shared/constants/modal.constants";
import { provideTranslateService } from "@ngx-translate/core";
import { take } from "rxjs";

describe("HomePageComponent", () => {
	let component: HomePageComponent;
	let fixture: ComponentFixture<HomePageComponent>;
	let mockModalService: IMockModalService;
	let mockWordsService: IMockWordsService;
	let mockSettingsService: IMockSettingsService;

	beforeEach(async () => {
		mockModalService = createMockModalService();
		mockWordsService = createMockWordsService();
		mockSettingsService = createMockSettingsService();

		await TestBed.configureTestingModule({
			imports: [
				HomePageComponent,
				WordListComponent,
				WordsOfTheDayComponent,
				UserStatisticsComponent,
				ButtonComponent,
			],
			providers: [
				provideHttpClient(),
				{ provide: ModalService, useValue: mockModalService },
				{ provide: WordsService, useValue: mockWordsService },
				{ provide: SettingsService, useValue: mockSettingsService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HomePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should expose word service observables", (done) => {
		mockWordsService.numberOfWords$.next(42);
		mockWordsService.numberOfLearningWords$.next(10);

		component.numberOfWords$.pipe(take(1)).subscribe((count) => {
			expect(count).toBe(42);
		});

		component.numberOfLearningWords$.pipe(take(1)).subscribe((count) => {
			expect(count).toBe(10);
			done();
		});
	});

	it("should expose settings service observables", (done) => {
		mockSettingsService.isStatisticsEnabled$.next(true);
		mockSettingsService.isFetchWotdEnabled$.next(false);
		mockSettingsService.hasAnyWidgetVisible$.next(true);

		component.isStatisticsEnabled$.pipe(take(1)).subscribe((enabled) => {
			expect(enabled).toBeTrue();
		});

		component.isFetchWotdEnabled$.pipe(take(1)).subscribe((enabled) => {
			expect(enabled).toBeFalse();
		});

		component.hasAnyWidgetVisible$.pipe(take(1)).subscribe((visible) => {
			expect(visible).toBeTrue();
			done();
		});
	});

	it("should toggle visibility of word adding modal on toggleIsAddWordModalOpen call", () => {
		component.toggleIsAddWordModalOpen(true);

		const modalService = TestBed.inject(ModalService);
		expect(modalService.toggleModal).toHaveBeenCalledWith(
			EModalType.WordAdding,
			true
		);
	});
});
