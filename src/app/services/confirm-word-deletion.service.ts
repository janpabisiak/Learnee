import { Injectable } from "@angular/core";
import { IWord } from "../types/word.interface";

@Injectable({
	providedIn: "root",
})
export class ConfirmWordDeletionService {
	word: IWord | null = null;
	purgeWords = false;
}
