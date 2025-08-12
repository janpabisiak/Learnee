import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LevelService } from "@services/level.service";

@Component({
	selector: "app-root",
	imports: [RouterModule, AsyncPipe],
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	standalone: true,
})
export class AppComponent {
	levelService = inject(LevelService);
	expPoints$ = this.levelService.expPoints$;
	level$ = this.levelService.level$;
}
