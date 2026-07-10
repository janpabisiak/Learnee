import { Routes } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { ErrorPageComponent } from "./components/error-page/error-page.component";
import { StudyPageComponent } from "@components/study-page/study-page.component";
import { EnoughWordsGuard } from "./guards/enough-words.guard";
import { SettingsPageComponent } from "@components/settings-page/settings-page.component";
import { FoldersPageComponent } from "@components/folders-page/folders-page.component";

export const routes: Routes = [
	{
		path: "",
		title: "Home - Learnee",
		component: HomePageComponent,
	},
	{
		path: "folders",
		title: "Folders - Learnee",
		component: FoldersPageComponent,
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
