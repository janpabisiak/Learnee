import { NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SectionTitleComponent } from "@components/utils/section-title/section-title.component";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs";

@Component({
	selector: "app-error-page",
	imports: [SectionTitleComponent, NgIf],
	templateUrl: "./error-page.component.html",
})
export class ErrorPageComponent implements OnInit {
	translationValue: string | null = null;

	constructor(private translation: TranslateService) {}

	ngOnInit() {
		this.translation
			.get("error.notFound")
			.pipe(take(1))
			.subscribe((translation) => {
				this.translationValue = translation;
			});
	}
}
