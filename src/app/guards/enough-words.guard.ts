import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { DEFAULT_TOASTER_DURATION, EToasterTypes } from "@shared/constants/toaster.constants";
import { ToasterService } from "@services/toaster/toaster.service";
import { WordsService } from "@services/words/words.service";
import { TranslateService } from "@ngx-translate/core";
import { MIN_WORDS_TO_PLAY } from "@shared/constants/game.constants";

@Injectable({
	providedIn: "root",
})
export class EnoughWordsGuard implements CanActivate {
	private enoughWords = false;

	constructor(
		private wordsService: WordsService,
		private toasterService: ToasterService,
		private router: Router,
		private translateService: TranslateService,
	) {
		this.wordsService.wordList$.subscribe((wordList) => {
			this.enoughWords = wordList.filter((w) => w.isLearning).length >= MIN_WORDS_TO_PLAY;
		});
	}

	canActivate(): boolean {
		if (this.enoughWords) return true;

		this.toasterService.addToaster({
			type: EToasterTypes.Error,
			content: this.translateService.instant("toaster.error.word.notEnoughWords"),
			duration: DEFAULT_TOASTER_DURATION,
		});

		this.router.navigate(["/"]);
		return false;
	}
}
