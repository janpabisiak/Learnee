import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { ESortTypes, WordsService } from "@services/words/words.service";
import { Subject, takeUntil } from "rxjs";

const sortTypes: Record<ESortTypes, string> = {
	[ESortTypes.NameASC]: "wordlist.sort.nameAsc",
	[ESortTypes.NameDESC]: "wordlist.sort.nameDesc",
	[ESortTypes.DefinitionASC]: "wordlist.sort.definitionAsc",
	[ESortTypes.DefinitionDESC]: "wordlist.sort.definitionDesc",
	[ESortTypes.IsLearningASC]: "wordlist.sort.learningAsc",
	[ESortTypes.IsLearningDESC]: "wordlist.sort.learningDesc",
	[ESortTypes.IdASC]: "wordlist.sort.idAsc",
	[ESortTypes.IdDESC]: "wordlist.sort.idDesc",
};

@Component({
	selector: "app-word-list-sort",
	imports: [TranslatePipe],
	templateUrl: "./word-list-sort.component.html",
})
export class WordListSortComponent implements OnInit, OnDestroy {
	@ViewChild("sortTypeSelect") sortTypeSelectEl!: ElementRef<HTMLSelectElement>;
	hasNotLearningWords = false;
	sortTypes: { type: string; translationKey: string }[] = [];
	currentSortType: ESortTypes = ESortTypes.IdDESC;
	private destroy$ = new Subject<void>();

	constructor(private wordsService: WordsService) {}

	ngOnInit() {
		this.wordsService.currentSortType$.pipe(takeUntil(this.destroy$)).subscribe((sortType) => {
			this.currentSortType = sortType;
		});

		this.wordsService.filteredWordList$.pipe(takeUntil(this.destroy$)).subscribe((wordList) => {
			const hasNotLearningWords = wordList.some((w) => !w.isLearning);
			const isLearningSortTypes = [ESortTypes.IsLearningASC, ESortTypes.IsLearningDESC];

			this.hasNotLearningWords = hasNotLearningWords;
			this.sortTypes = Object.entries(sortTypes)
				.map(([type, translationKey]) => ({
					type,
					translationKey,
				}))
				.filter(
					(st) =>
						hasNotLearningWords || !isLearningSortTypes.includes(st.type as ESortTypes),
				);
		});
	}

	changeSortType(value: string) {
		this.wordsService.changeSortType(value as ESortTypes);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
