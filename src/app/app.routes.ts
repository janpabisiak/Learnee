import { Routes } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { ErrorPageComponent } from "./components/error-page/error-page.component";
import { StudyPageComponent } from "@components/study-page/study-page.component";
import { EnoughWordsGuard } from "./guards/enoughWords.guard";
import { SettingsPageComponent } from "@components/settings-page/settings-page.component";

export const routes: Routes = [
	{
		path: "",
		title: "Home - Learnee",
		component: HomePageComponent,
	},
	{
		path: "study",
		title: "Study - Learnee",
		component: StudyPageComponent,
		canActivate: [EnoughWordsGuard],
	},
	{
		path: "settings",
		title: "Settings - Learnee",
		component: SettingsPageComponent,
	},
	{
		path: "**",
		title: "Error 404 - Learnee",
		component: ErrorPageComponent,
	},
];
