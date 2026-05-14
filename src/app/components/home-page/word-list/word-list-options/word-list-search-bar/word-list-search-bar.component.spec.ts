import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WordListSearchBarComponent } from "./word-list-search-bar.component";
import { provideHttpClient } from "@angular/common/http";
import { createMockWordsService, IMockWordsService } from "@services/words/words.service.mock";
import { WordsService } from "@services/words/words.service";
import { provideTranslateService } from "@ngx-translate/core";

describe("WordListSearchBarComponent", () => {
	let component: WordListSearchBarComponent;
	let fixture: ComponentFixture<WordListSearchBarComponent>;
	let mockWordsService: IMockWordsService;

	beforeEach(async () => {
		mockWordsService = createMockWordsService();

		await TestBed.configureTestingModule({
			imports: [WordListSearchBarComponent],
			providers: [
				provideHttpClient(),
				{ provide: WordsService, useValue: mockWordsService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(WordListSearchBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should call wordsService.setSearchQuery on search method call", () => {
		const inputElement = document.createElement("input");
		inputElement.value = "test";
		component.search(inputElement);

		expect(mockWordsService.setSearchQuery).toHaveBeenCalledOnceWith("test");
	});
});
