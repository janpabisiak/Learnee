import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";
import { FolderListOptionsComponent } from "./folder-list-options.component";
import { FolderListPurgerComponent } from "./folder-list-purger/folder-list-purger.component";
import { FolderListSearchBarComponent } from "./folder-list-search-bar/folder-list-search-bar.component";
import { FolderListSelectionControlButtonsComponent } from "./folder-list-selection-control-buttons/folder-list-selection-control-buttons.component";
import { FolderListSortComponent } from "./folder-list-sort/folder-list-sort.component";

describe("FolderListOptionsComponent", () => {
	let component: FolderListOptionsComponent;
	let fixture: ComponentFixture<FolderListOptionsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				FolderListOptionsComponent,
				FolderListPurgerComponent,
				FolderListSearchBarComponent,
				FolderListSortComponent,
				FolderListSelectionControlButtonsComponent,
			],
			providers: [
				provideHttpClient(),
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(FolderListOptionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
