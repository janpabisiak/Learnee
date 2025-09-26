import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MatchingGameComponent } from "./matching-game.component";
import { provideHttpClient } from "@angular/common/http";
import { DraggableItemsListComponent } from "./draggable-items-list/draggable-items-list.component";
import { ButtonComponent } from "@components/utils/button/button.component";
import { provideTranslateService } from "@ngx-translate/core";

describe("MatchingGameComponent", () => {
	let component: MatchingGameComponent;
	let fixture: ComponentFixture<MatchingGameComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MatchingGameComponent, DraggableItemsListComponent, ButtonComponent],
			providers: [
				provideHttpClient(),
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(MatchingGameComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should remove subscription on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");

		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
