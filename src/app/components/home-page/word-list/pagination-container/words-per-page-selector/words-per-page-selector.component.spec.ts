import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WordsPerPageSelectorComponent } from "./words-per-page-selector.component";
import { createMockPaginationService, IMockPaginationService } from "app/app.component.spec";
import { PaginationService } from "@services/pagination.service";
import { provideTranslateService } from "@ngx-translate/core";

describe("WordsPerPageSelectorComponent", () => {
	let component: WordsPerPageSelectorComponent;
	let fixture: ComponentFixture<WordsPerPageSelectorComponent>;
	let mockPaginationService: IMockPaginationService;

	beforeEach(async () => {
		mockPaginationService = createMockPaginationService();

		await TestBed.configureTestingModule({
			imports: [WordsPerPageSelectorComponent],
			providers: [
				{ provide: PaginationService, useValue: mockPaginationService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(WordsPerPageSelectorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should update wordsPerPage property on subscription change", () => {
		mockPaginationService.wordsPerPage$.next(20);

		expect(component.wordsPerPage).toBe(20);
	});

	it("should call paginationService.setWordsPerPage on setWordsPerPage call", () => {
		const selectEl = {
			nativeElement: document.createElement("select"),
		};
		selectEl.nativeElement.value = "10";
		component.setWordsPerPage();

		expect(mockPaginationService.setWordsPerPage).toHaveBeenCalledOnceWith(5);
	});

	it("should remove subscription on component destroy", () => {
		const unsubscribeSpy = spyOn(component["wordsPerPageSubscription"], "unsubscribe");
		component.ngOnDestroy();

		expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
	});
});
