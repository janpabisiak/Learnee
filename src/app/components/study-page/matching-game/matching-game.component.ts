import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from "@angular/core";
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatchingGameService } from "@services/matching-game.service";
import { ButtonComponent } from "@components/utils/button/button.component";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-matching-game",
	imports: [CdkDrag, CdkDropList, ButtonComponent, CommonModule],
	templateUrl: "./matching-game.component.html",
	styleUrls: ["./matching-game.component.css"],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MatchingGameComponent implements OnInit {
	terms: string[] = [];
	definitions: string[] = [];
	results: boolean[] = [];

	constructor(private matchingGameService: MatchingGameService) {}

	ngOnInit() {
		this.matchingGameService.generateMatchingGame(5);

		this.terms = this.matchingGameService.terms.sort(() => Math.random() - 0.5);
		this.definitions = this.matchingGameService.definitions.sort(() => Math.random() - 0.5);
	}

	reorder(arr: string[], event: CdkDragDrop<string[]>) {
		moveItemInArray(arr, event.previousIndex, event.currentIndex);
	}

	checkAnswers() {
		this.results = this.matchingGameService.checkAnswers(this.terms, this.definitions);

		console.log(this.results);
	}
}
