import { DatePipe, NgClass } from "@angular/common";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { IStatistics } from "@services/level/level.service";
import { EAvailableLanguages, SettingsService } from "@services/settings/settings.service";
import { Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-heat-map-item",
	imports: [NgClass, DatePipe, TranslatePipe],
	templateUrl: "./heat-map-item.component.html",
})
export class HeatMapItemComponent implements OnInit, OnDestroy {
	@Input({ required: true }) day!: IStatistics;
	@Input({ required: true }) maxPlays!: number;
	percentOfMax = 0;
	currentLanguage: EAvailableLanguages = EAvailableLanguages.English;
	private destroy$ = new Subject<void>();

	constructor(private settingsService: SettingsService) {}

	ngOnInit() {
		this.settingsService.currentLanguage$.pipe(takeUntil(this.destroy$)).subscribe((lang) => {
			this.currentLanguage = lang;
		});

		this.percentOfMax = isNaN(this.day.numberOfPlays / this.maxPlays)
			? 0
			: this.day.numberOfPlays / this.maxPlays;
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
