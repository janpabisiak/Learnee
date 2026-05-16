import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { HomePageComponent } from "./home-page.component";
import { WordListComponent } from "./word-list/word-list.component";
import { WordsOfTheDayComponent } from "./words-of-the-day/words-of-the-day.component";
import { UserStatisticsComponent } from "./user-statistics/user-statistics.component";
import { ButtonComponent } from "@components/utils/button/button.component";
import { createMockModalService, IMockModalService } from "@services/modal/modal.service.mock";
import {
	createMockWordsService,
	IMockWordsService,
	mockWords,
} from "@services/words/words.service.mock";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { WordsService } from "@services/words/words.service";
import { provideTranslateService } from "@ngx-translate/core";

describe("HomePageComponent", () => {
	let component: HomePageComponent;
	let fixture: ComponentFixture<HomePageComponent>;
	let mockModalService: IMockModalService;
	let mockWordsService: IMockWordsService;

	beforeEach(async () => {
		mockModalService = createMockModalService();
		mockWordsService = createMockWordsService();

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

	it("should subscribe to numberOfWords$ on component init", () => {
		expect(component.numOfWords).toEqual(0);

		mockWordsService.numberOfWords$.next(mockWords.length);
		component.ngOnInit();

		expect(component.numOfWords).toEqual(mockWords.length);
	});

	it("should toggle visibility of word adding modal on toggleIsAddWordModalOpen call", () => {
		component.toggleIsAddWordModalOpen(true);

		expect(component.modalService.toggleModal).toHaveBeenCalledWith(
			EModalType.WordAdding,
			true
		);
	});

	it("should unsubscribe on component destroy", () => {
		const unsubscribeSpy = spyOn(component["subscription"], "unsubscribe");
		component.ngOnDestroy();

		expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
	});
});
