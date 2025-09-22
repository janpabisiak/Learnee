import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ResultsIndicatorComponent } from "./results-indicator.component";
import { provideHttpClient } from "@angular/common/http";
import {
	createMockPaginationService,
	createMockWordsService,
	IMockPaginationService,
	IMockWordsService,
	mockResultRange,
	mockWords,
} from "app/app.component.spec";
import { PaginationService } from "@services/pagination.service";
import { WordsService } from "@services/words.service";

describe("ResultsIndicatorComponent", () => {
	let component: ResultsIndicatorComponent;
	let fixture: ComponentFixture<ResultsIndicatorComponent>;
	let mockPaginationService: IMockPaginationService;
	let mockWordsService: IMockWordsService;

	beforeEach(async () => {
		mockPaginationService = createMockPaginationService();
		mockWordsService = createMockWordsService();

		await TestBed.configureTestingModule({
			imports: [ResultsIndicatorComponent],
			providers: [
				provideHttpClient(),
				{ provide: PaginationService, useValue: mockPaginationService },
				{ provide: WordsService, useValue: mockWordsService },
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
		mockPaginationService.resultRange$.next(mockResultRange);
		mockWordsService.filteredWordList$.next(mockWords);

		expect(component.resultRange).toEqual(mockResultRange);
		expect(component.numberOfWords).toBe(mockWords.length);
	});

	it("should remove subscription on component destroy", () => {
		const unsubscribeSpy = spyOn(component["subscription"], "unsubscribe");
		component.ngOnDestroy();

		expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
	});
});
