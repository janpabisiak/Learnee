import { Component, Input } from "@angular/core";
import { SentenceCasePipe } from "@pipes/sentence-case.pipe";

@Component({
	selector: "app-wotd-item",
	imports: [SentenceCasePipe],
	templateUrl: "./wotd-item.component.html",
})
export class WotdItemComponent {
	@Input({ required: true }) word!: string;
	@Input({ required: true }) definition!: string;
}
