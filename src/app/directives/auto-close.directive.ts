import { Directive, ElementRef, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
	selector: "[appAutoClose]",
	standalone: true,
})
export class AutoCloseDirective {
	@Output() close = new EventEmitter<void>();

	constructor(private elementRef: ElementRef) {}

	@HostListener("document:click", ["$event.target"])
	onClick(target: EventTarget | null) {
		if (!target) return;

		const clickedInside = this.elementRef.nativeElement.contains(target);

		if (!clickedInside) {
			this.close.emit();
		}
	}

	@HostListener("document:keydown.escape")
	onEscape() {
		this.close.emit();
	}
}
