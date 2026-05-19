import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WordListSelectionControlButtonsComponent } from "./word-list-selection-control-buttons.component";
import { createMockWordsService, IMockWordsService } from "@services/words/words.service.mock";
import { WordsService } from "@services/words/words.service";
import { provideTranslateService } from "@ngx-translate/core";

describe("WordListSelectionControlButtonsComponent", () => {
	let component: WordListSelectionControlButtonsComponent;
	let fixture: ComponentFixture<WordListSelectionControlButtonsComponent>;
	let mockWordsService: IMockWordsService;

	beforeEach(async () => {
		mockWordsService = createMockWordsService();

		await TestBed.configureTestingModule({
			imports: [WordListSelectionControlButtonsComponent],
			providers: [
				{ provide: WordsService, useValue: mockWordsService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(WordListSelectionControlButtonsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
