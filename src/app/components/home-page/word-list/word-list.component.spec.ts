import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WordListComponent } from "./word-list.component";
import { provideHttpClient } from "@angular/common/http";
import { WordListOptionsComponent } from "./word-list-options/word-list-options.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { WordListItemComponent } from "./word-list-item/word-list-item.component";
import { PaginationContainerComponent } from "./pagination-container/pagination-container.component";

describe("WordListComponent", () => {
	let component: WordListComponent;
	let fixture: ComponentFixture<WordListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				WordListComponent,
				WordListOptionsComponent,
				WordListItemComponent,
				PaginationContainerComponent,
			],
			providers: [provideHttpClient()],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(WordListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should remove subscription on component destroy", () => {
		const nextSpy = spyOn(component["destroy$"], "next");
		const completeSpy = spyOn(component["destroy$"], "complete");

		component.ngOnDestroy();

		expect(nextSpy).toHaveBeenCalledTimes(1);
		expect(completeSpy).toHaveBeenCalledTimes(1);
	});
});
