import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WordListSelectionControlButtonComponent } from "./word-list-selection-control-button.component";
import { createMockWordsService, IMockWordsService } from "@services/words/words.service.mock";
import { WordsService } from "@services/words/words.service";
import { provideTranslateService } from "@ngx-translate/core";

describe("WordListSelectionControlButtonComponent", () => {
	let component: WordListSelectionControlButtonComponent;
	let fixture: ComponentFixture<WordListSelectionControlButtonComponent>;
	let mockWordsService: IMockWordsService;

	beforeEach(async () => {
		mockWordsService = createMockWordsService();

		await TestBed.configureTestingModule({
			imports: [WordListSelectionControlButtonComponent],
			providers: [
				{ provide: WordsService, useValue: mockWordsService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(WordListSelectionControlButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
