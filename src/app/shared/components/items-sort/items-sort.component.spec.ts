import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemsSortComponent } from "./items-sort.component";
import { ECommonSortTypes } from "@shared/constants/sorting.constants";
import { provideTranslateService } from "@ngx-translate/core";

describe("ItemsSortComponent", () => {
	let component: ItemsSortComponent<ECommonSortTypes>;
	let fixture: ComponentFixture<ItemsSortComponent<ECommonSortTypes>>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ItemsSortComponent],
			providers: [
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent<ItemsSortComponent<ECommonSortTypes>>(ItemsSortComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
