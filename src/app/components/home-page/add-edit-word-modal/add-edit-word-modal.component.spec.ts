import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { AddEditWordModalComponent } from "./add-edit-word-modal.component";
import { ModalComponent } from "@components/utils/modal/modal.component";

describe("AddEditWordModalComponent", () => {
	let component: AddEditWordModalComponent;
	let fixture: ComponentFixture<AddEditWordModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AddEditWordModalComponent, ModalComponent],
			providers: [provideHttpClient()],
		}).compileComponents();

		fixture = TestBed.createComponent(AddEditWordModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
