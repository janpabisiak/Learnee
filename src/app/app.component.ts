import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LevelService } from "@services/level.service";
import { HeaderComponent } from "app/header/header.component";

@Component({
	selector: "app-root",
	imports: [RouterModule, HeaderComponent],
	templateUrl: "./app.component.html",
	standalone: true,
})
export class AppComponent {
	levelService = inject(LevelService);
	expPoints$ = this.levelService.expPoints$;
	level$ = this.levelService.level$;
}
