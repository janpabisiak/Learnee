import { NgClass } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
	selector: "app-true-false-answer",
	imports: [NgClass, TranslatePipe],
	templateUrl: "./true-false-answer.component.html",
})
export class TrueFalseAnswerComponent {
	@Input({ required: true }) type!: boolean;
	@Input({ required: true }) isAnswered: boolean = false;
	@Input({ required: true }) isCorrect: boolean = false;
	@Output() answered = new EventEmitter<boolean>();

	answerQuestion(isTrue: boolean) {
		this.answered.emit(isTrue);
	}
}
