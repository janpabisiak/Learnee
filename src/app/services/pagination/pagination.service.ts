import { Injectable } from "@angular/core";
import { IWord } from "../../types/word.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class PaginationService {
	private page = new BehaviorSubject<number>(1);
	private maxPage = new BehaviorSubject<number>(1);
	private wordsPerPage = new BehaviorSubject<number>(10);
	private resultRange = new BehaviorSubject<IResultRange>({ start: 0, end: 10 });
	private numberOfWords = 0;

	page$ = this.page.asObservable();
	maxPage$ = this.maxPage.asObservable();
	wordsPerPage$ = this.wordsPerPage.asObservable();
	resultRange$ = this.resultRange.asObservable();

	setPage(page: number) {
		if (page < 1 || page > this.maxPage.value) {
			this.page.next(1);
			return;
		}

		this.page.next(page);
	}

	private calcMaxPage() {
		const maxPage = Math.ceil(this.numberOfWords / this.wordsPerPage.value) || 1;

		if (this.page.value > maxPage) this.page.next(maxPage);
		this.maxPage.next(maxPage);
	}

	private calcResultRange() {
		const page = this.page.value;
		const wordsPerPage = this.wordsPerPage.value;

		this.resultRange.next({
			start: (page - 1) * wordsPerPage,
			end: Math.min((page - 1) * wordsPerPage + wordsPerPage, this.numberOfWords),
		});
	}

	setWordsPerPage(amount: number) {
		this.wordsPerPage.next(amount);
		this.calcMaxPage();
	}

	paginateWordList(filteredWordList: IWord[]) {
		this.numberOfWords = filteredWordList.length;
		this.calcMaxPage();
		this.calcResultRange();

		const resultRange = this.resultRange.value;

		return filteredWordList.slice(resultRange.start, resultRange.end);
	}
}

export interface IResultRange {
	start: number;
	end: number;
}
