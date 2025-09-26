import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GameSelectorItemComponent } from "./game-selector-item.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { EAvailableGames } from "@services/game/game.service";
import { provideTranslateService } from "@ngx-translate/core";

describe("GameSelectorItemComponent", () => {
	let component: GameSelectorItemComponent;
	let fixture: ComponentFixture<GameSelectorItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [GameSelectorItemComponent],
			providers: [
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(GameSelectorItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should emit gameClicked event with game on onGameClicked call", () => {
		const emitSpy = spyOn(component.gameClicked, "emit");
		component.onGameClicked(EAvailableGames.FillGaps);

		expect(emitSpy).toHaveBeenCalledOnceWith(EAvailableGames.FillGaps);
	});

	it("should emit gameClicked event with 'all' on onGameClicked call", () => {
		const emitSpy = spyOn(component.gameClicked, "emit");
		component.onGameClicked("all");

		expect(emitSpy).toHaveBeenCalledOnceWith("all");
	});
});
