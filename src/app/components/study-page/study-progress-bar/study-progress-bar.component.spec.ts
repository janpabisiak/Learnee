import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StudyProgressBarComponent } from "./study-progress-bar.component";

describe("StudyProgressBarComponent", () => {
	let component: StudyProgressBarComponent;
	let fixture: ComponentFixture<StudyProgressBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [StudyProgressBarComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(StudyProgressBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
