import { Routes } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { QuizPageComponent } from "./components/quiz-page/quiz-page.component";

export const routes: Routes = [
	{
		path: "",
		component: HomePageComponent,
	},
	{
		path: "quiz",
		component: QuizPageComponent,
	},
];
