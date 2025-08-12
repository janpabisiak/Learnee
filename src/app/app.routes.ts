import { Routes } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { QuizPageComponent } from "./components/quiz-page/quiz-page.component";
import { ErrorPageComponent } from "./components/error-page/error-page.component";

export const routes: Routes = [
	{
		path: "",
		title: "LearnEnglishApp",
		component: HomePageComponent,
	},
	{
		path: "quiz",
		title: "Quiz page",
		component: QuizPageComponent,
	},
	{
		path: "**",
		title: "Error 404",
		component: ErrorPageComponent,
	},
];
