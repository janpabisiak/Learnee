import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemsPerPageSelectorComponent } from "./items-per-page-selector.component";
import { provideTranslateService } from "@ngx-translate/core";

describe("ItemsPerPageSelectorComponent", () => {
	let component: ItemsPerPageSelectorComponent;
	let fixture: ComponentFixture<ItemsPerPageSelectorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ItemsPerPageSelectorComponent],
			providers: [
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ItemsPerPageSelectorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
