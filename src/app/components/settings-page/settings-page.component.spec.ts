import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SettingsPageComponent } from "./settings-page.component";
import { provideTranslateService } from "@ngx-translate/core";

describe("SettingsPageComponent", () => {
	let component: SettingsPageComponent;
	let fixture: ComponentFixture<SettingsPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SettingsPageComponent],
			providers: [
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(SettingsPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
