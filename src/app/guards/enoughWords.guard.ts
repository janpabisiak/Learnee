import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { EToasterTypes } from "@components/utils/toaster-container/toaster/toaster.component";
import { ToasterService } from "@services/toaster.service";
import { WordsService } from "@services/words.service";

@Injectable({
	providedIn: "root",
})
export class EnoughWordsGuard implements CanActivate {
	private enoughWords = false;

	constructor(
		private wordsService: WordsService,
		private toasterService: ToasterService,
		private router: Router
	) {
		this.wordsService.wordList$.subscribe((wordList) => {
			this.enoughWords = wordList.filter((w) => w.isLearning).length > 4;
		});
	}

	canActivate(): boolean {
		if (this.enoughWords) return true;

		this.toasterService.addToaster({
			type: EToasterTypes.Error,
			content: "Not enough learning words to start a game.",
			duration: 5,
		});

		this.router.navigate(["/"]);
		return false;
	}
}
