import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WordListPurgerComponent } from "./word-list-purger.component";
import { ButtonComponent } from "@components/utils/button/button.component";
import {
	createMockConfirmWordDeletionService,
	createMockModalService,
	IMockMockConfirmWordDeletionService,
	IMockModalService,
} from "app/app.component.spec";
import { ModalService } from "@services/modal.service";
import { ConfirmWordDeletionService } from "@services/confirm-word-deletion.service";

describe("WordListPurgerComponent", () => {
	let component: WordListPurgerComponent;
	let fixture: ComponentFixture<WordListPurgerComponent>;
	let mockModalService: IMockModalService;
	let mockConfirmWordDeletionService: IMockMockConfirmWordDeletionService;

	beforeEach(async () => {
		mockModalService = createMockModalService();
		mockConfirmWordDeletionService = createMockConfirmWordDeletionService();

		await TestBed.configureTestingModule({
			imports: [WordListPurgerComponent, ButtonComponent],
			providers: [
				{ provide: ModalService, useValue: mockModalService },
				{ provide: ConfirmWordDeletionService, useValue: mockConfirmWordDeletionService },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(WordListPurgerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should call modalService.toggleShowWordDeletionModal and set purgeWords on openModal call", () => {
		component.openModal();

		expect(mockModalService.toggleShowWordDeletionModal).toHaveBeenCalledOnceWith(true);
		expect(mockConfirmWordDeletionService.purgeWords).toBeTrue();
	});
});
