import { AsyncPipe } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { ModalService } from "@services/modal/modal.service";
import { SettingsService } from "@services/settings/settings.service";
import { SectionTitleComponent } from "@shared/components/section-title/section-title.component";
import { TagComponent } from "@shared/components/tag/tag.component";
import { EModalType } from "@shared/constants/modal.constants";
import { WordsService } from "../../services/words/words.service";
import { UserStatisticsComponent } from "./user-statistics/user-statistics.component";
import { WordListComponent } from "./word-list/word-list.component";
import { WordsOfTheDayComponent } from "./words-of-the-day/words-of-the-day.component";

@Component({
	selector: "app-home-page",
	standalone: true,
	templateUrl: "./home-page.component.html",
	imports: [
		WordListComponent,
		WordsOfTheDayComponent,
		UserStatisticsComponent,
		SectionTitleComponent,
		TranslatePipe,
		TagComponent,
		AsyncPipe,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent {
	private wordsService = inject(WordsService);
	private modalService = inject(ModalService);
	private settingsService = inject(SettingsService);

	isStatisticsEnabled$ = this.settingsService.isStatisticsEnabled$;
	isFetchWotdEnabled$ = this.settingsService.isFetchWotdEnabled$;
	hasAnyWidgetVisible$ = this.settingsService.hasAnyWidgetVisible$;
	numberOfWords$ = this.wordsService.numberOfWords$;
	numberOfLearningWords$ = this.wordsService.numberOfLearningWords$;

	toggleIsAddWordModalOpen(isOpen: boolean) {
		this.modalService.toggleModal(EModalType.WordAdding, isOpen);
	}
}
