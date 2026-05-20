import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FolderPaginationContainerComponent } from "./folder-pagination-container.component";
import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";
import { PaginationButtonsComponent } from "@shared/pagination-buttons/pagination-buttons.component";
import { ResultsCounterComponent } from "@shared/results-counter/results-counter.component";
import { ItemsPerPageSelectorComponent } from "@shared/items-per-page-selector/items-per-page-selector.component";

describe("FolderPaginationContainerComponent", () => {
	let component: FolderPaginationContainerComponent;
	let fixture: ComponentFixture<FolderPaginationContainerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				FolderPaginationContainerComponent,
				PaginationButtonsComponent,
				ResultsCounterComponent,
				ItemsPerPageSelectorComponent,
			],
			providers: [
				provideHttpClient(),
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(FolderPaginationContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
