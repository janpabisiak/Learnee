import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TrueFalseAnswerComponent } from "./true-false-answer.component";
import { provideTranslateService } from "@ngx-translate/core";

describe("TrueFalseAnswerComponent", () => {
	let component: TrueFalseAnswerComponent;
	let fixture: ComponentFixture<TrueFalseAnswerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TrueFalseAnswerComponent],
			providers: [
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(TrueFalseAnswerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should emit answered on answerQuestion call", () => {
		const emitSpy = spyOn(component.answered, "emit");
		component.answerQuestion(true);

		expect(emitSpy).toHaveBeenCalledOnceWith(true);
	});
});
