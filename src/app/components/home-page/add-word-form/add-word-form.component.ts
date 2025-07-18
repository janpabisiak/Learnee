import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { WordsService } from "../../../services/words.service";

@Component({
	selector: "app-add-word-form",
	imports: [FormsModule],
	templateUrl: "./add-word-form.component.html",
	styleUrl: "./add-word-form.component.scss",
	standalone: true,
})
export class AddWordFormComponent {
	word: string = "";

	constructor(private wordsService: WordsService) {}

	addWord(e: SubmitEvent) {
		e.preventDefault();

		const word = this.word
			.replaceAll(/[^a-zA-Z\s]+/g, "")
			.trim()
			.toLowerCase();
		this.word = "";

		this.wordsService.addWord(word);
	}
}
