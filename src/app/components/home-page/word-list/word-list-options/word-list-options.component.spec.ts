import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WordListOptionsComponent } from "./word-list-options.component";
import { provideHttpClient } from "@angular/common/http";
import { WordListPurgerComponent } from "./word-list-purger/word-list-purger.component";
import { WordListSearchBarComponent } from "./word-list-search-bar/word-list-search-bar.component";
import { WordListSortComponent } from "./word-list-sort/word-list-sort.component";

describe("WordListOptionsComponent", () => {
	let component: WordListOptionsComponent;
	let fixture: ComponentFixture<WordListOptionsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				WordListOptionsComponent,
				WordListPurgerComponent,
				WordListSearchBarComponent,
				WordListSortComponent,
			],
			providers: [provideHttpClient()],
		}).compileComponents();

		fixture = TestBed.createComponent(WordListOptionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
