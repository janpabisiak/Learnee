import { Component } from "@angular/core";
import { PaginationButtonsComponent } from "./pagination-buttons/pagination-buttons.component";
import { ResultsIndicatorComponent } from "./results-indicator/results-indicator.component";
import { WordsPerPageSelectorComponent } from "./words-per-page-selector/words-per-page-selector.component";

@Component({
	selector: "app-pagination-container",
	imports: [PaginationButtonsComponent, ResultsIndicatorComponent, WordsPerPageSelectorComponent],
	templateUrl: "./pagination-container.component.html",
})
export class PaginationContainerComponent {}
