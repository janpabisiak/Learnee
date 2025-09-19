import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { HomePageComponent } from "./home-page.component";
import { WordListComponent } from "./word-list/word-list.component";
import { WordsOfTheDayComponent } from "./words-of-the-day/words-of-the-day.component";
import { UserStatisticsComponent } from "./user-statistics/user-statistics.component";
import { ButtonComponent } from "@components/utils/button/button.component";
import {
	createMockModalService,
	createMockWordsService,
	IMockModalService,
	IMockWordsService,
	mockWords,
} from "app/app.component.spec";
import { ModalService } from "@services/modal.service";
import { WordsService } from "@services/words.service";

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
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HomePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should subscribe to wordList$ on component init", () => {
		expect(component.wordList).toEqual([]);

		mockWordsService.wordList$.next(mockWords);
		component.ngOnInit();

		expect(component.wordList).toEqual(mockWords);
	});

	it("should toggle visibility of word adding modal on toggleIsAddWordModalOpen call", () => {
		component.toggleIsAddWordModalOpen(true);

		expect(component.modalService.toggleShowWordAddingModal).toHaveBeenCalledWith(true);
	});

	it("should unsubscribe on component destroy", () => {
		const unsubscribeSpy = spyOn(component["subscription"], "unsubscribe");
		component.ngOnDestroy();

		expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
	});
});
