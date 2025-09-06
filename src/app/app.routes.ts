import { Routes } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { ErrorPageComponent } from "./components/error-page/error-page.component";
import { StudyPageComponent } from "@components/study-page/study-page.component";

export const routes: Routes = [
	{
		path: "",
		title: "LearnEnglishApp",
		component: HomePageComponent,
	},
	{
		path: "study",
		title: "Study page",
		component: StudyPageComponent,
	},
	{
		path: "**",
		title: "Error 404",
		component: ErrorPageComponent,
	},
];
