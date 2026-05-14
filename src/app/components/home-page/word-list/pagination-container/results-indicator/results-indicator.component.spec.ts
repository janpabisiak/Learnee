import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ResultsIndicatorComponent } from "./results-indicator.component";
import { provideHttpClient } from "@angular/common/http";
import {
	createMockWordsService,
	IMockWordsService,
	mockResultRange,
	mockWords,
} from "@services/words/words.service.mock";
import { WordsService } from "@services/words/words.service";
import { provideTranslateService } from "@ngx-translate/core";

describe("ResultsIndicatorComponent", () => {
	let component: ResultsIndicatorComponent;
	let fixture: ComponentFixture<ResultsIndicatorComponent>;
	let mockWordsService: IMockWordsService;

	beforeEach(async () => {
		mockWordsService = createMockWordsService();

		await TestBed.configureTestingModule({
			imports: [ResultsIndicatorComponent],
			providers: [
				provideHttpClient(),
				{ provide: WordsService, useValue: mockWordsService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ResultsIndicatorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should update properties values on subscriptions update", () => {
		mockWordsService.resultRange$.next(mockResultRange);
		mockWordsService.numberOfFilteredWords$.next(mockWords.length);

		expect(component.resultRange).toEqual(mockResultRange);
		expect(component.numberOfWords).toBe(mockWords.length);
	});

	it("should remove subscription on component destroy", () => {
		const unsubscribeSpy = spyOn(component["subscription"], "unsubscribe");
		component.ngOnDestroy();

		expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
	});
});
