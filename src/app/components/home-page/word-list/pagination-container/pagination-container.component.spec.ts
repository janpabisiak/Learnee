import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PaginationContainerComponent } from "./pagination-container.component";
import { PaginationButtonsComponent } from "./pagination-buttons/pagination-buttons.component";
import { ResultsIndicatorComponent } from "./results-indicator/results-indicator.component";
import { WordsPerPageSelectorComponent } from "./words-per-page-selector/words-per-page-selector.component";
import { provideHttpClient } from "@angular/common/http";

describe("PaginationContainerComponent", () => {
	let component: PaginationContainerComponent;
	let fixture: ComponentFixture<PaginationContainerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				PaginationContainerComponent,
				PaginationButtonsComponent,
				ResultsIndicatorComponent,
				WordsPerPageSelectorComponent,
			],
			providers: [provideHttpClient()],
		}).compileComponents();

		fixture = TestBed.createComponent(PaginationContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
