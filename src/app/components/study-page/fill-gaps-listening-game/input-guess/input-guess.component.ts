import { NgClass } from "@angular/common";
import {
	AfterViewChecked,
	Component,
	ElementRef,
	EventEmitter,
	HostListener,
	Input,
	Output,
	ViewChild,
} from "@angular/core";

@Component({
	selector: "app-input-guess",
	imports: [NgClass],
	templateUrl: "./input-guess.component.html",
	styleUrl: "./input-guess.component.css",
})
export class InputGuessComponent implements AfterViewChecked {
	@ViewChild("input") inputEl!: ElementRef<HTMLInputElement>;
	@Input({ required: true }) value!: string;
	@Input({ required: true }) wordLength!: number;
	@Input({ required: true }) answered!: boolean;
	@Input({ required: true }) answeredCorrect!: boolean;
	@Input({ required: true }) disabled!: boolean;
	@Output() valueChanged = new EventEmitter<string>();
	@HostListener("input", ["$event.target"])
	onInput(inputEl: HTMLInputElement) {
		this.valueChanged.emit(inputEl.value);
	}

	ngAfterViewChecked() {
		this.inputEl.nativeElement.focus();
	}
}
