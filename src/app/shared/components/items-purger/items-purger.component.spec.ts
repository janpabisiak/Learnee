import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemsPurgerComponent } from "./items-purger.component";
import { provideTranslateService } from "@ngx-translate/core";

describe("ItemsPurgerComponent", () => {
	let component: ItemsPurgerComponent;
	let fixture: ComponentFixture<ItemsPurgerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ItemsPurgerComponent],
			providers: [
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ItemsPurgerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
