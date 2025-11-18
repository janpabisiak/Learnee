import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WordListPurgerComponent } from "./word-list-purger.component";
import { ButtonComponent } from "@components/utils/button/button.component";
import {
	createMockConfirmWordDeletionService,
	createMockModalService,
	IMockMockConfirmWordDeletionService,
	IMockModalService,
} from "app/app.component.spec";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { ConfirmWordDeletionService } from "@services/confirm-word-deletion/confirm-word-deletion.service";
import { provideTranslateService } from "@ngx-translate/core";

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
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(WordListPurgerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should show word deletion modal and set purgeWords on openModal call", () => {
		component.openModal();

		expect(mockModalService.toggleModal).toHaveBeenCalledOnceWith(
			EModalType.WordDeletion,
			true
		);
		expect(mockConfirmWordDeletionService.purgeWords).toBeTrue();
	});
});
