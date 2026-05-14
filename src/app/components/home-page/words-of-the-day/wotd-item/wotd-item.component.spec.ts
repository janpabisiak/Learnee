import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WotdItemComponent } from "./wotd-item.component";
import { SentenceCasePipe } from "@pipes/sentence-case.pipe";
import { mockWords } from "@services/words/words.service.mock";

describe("WotdItemComponent", () => {
	let component: WotdItemComponent;
	let fixture: ComponentFixture<WotdItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [WotdItemComponent, SentenceCasePipe],
		}).compileComponents();

		fixture = TestBed.createComponent(WotdItemComponent);
		component = fixture.componentInstance;
		component.word = mockWords[0].name;
		component.definition = mockWords[0].definition;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
