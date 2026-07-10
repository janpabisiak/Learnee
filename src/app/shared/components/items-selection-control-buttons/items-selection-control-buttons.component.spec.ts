import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemsSelectionControlButtonsComponent } from "./items-selection-control-buttons.component";
import { provideTranslateService } from "@ngx-translate/core";

describe("ItemsSelectionControlButtonsComponent", () => {
	let component: ItemsSelectionControlButtonsComponent;
	let fixture: ComponentFixture<ItemsSelectionControlButtonsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ItemsSelectionControlButtonsComponent],
			providers: [
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ItemsSelectionControlButtonsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
