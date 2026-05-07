import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ConfirmImportModalComponent } from "./confirm-import-modal.component";
import { provideHttpClient } from "@angular/common/http";
import { ModalComponent } from "@components/utils/modal/modal.component";
import {
	createMockLocalStorageService,
	createMockModalService,
	IMockLocalStorageService,
	IMockModalService,
} from "app/app.component.spec";
import { ModalService } from "@services/modal/modal.service";
import { LocalStorageService } from "@services/local-storage/local-storage.service";
import { provideTranslateService } from "@ngx-translate/core";

describe("ConfirmImportModalComponent", () => {
	let component: ConfirmImportModalComponent;
	let fixture: ComponentFixture<ConfirmImportModalComponent>;
	let mockModalService: IMockModalService;
	let mockLocalStorageService: IMockLocalStorageService;

	beforeEach(async () => {
		mockModalService = createMockModalService();
		mockLocalStorageService = createMockLocalStorageService();

		await TestBed.configureTestingModule({
			imports: [ConfirmImportModalComponent, ModalComponent],
			providers: [
				provideHttpClient(),
				{ provide: ModalService, useValue: mockModalService },
				{ provide: LocalStorageService, useValue: mockLocalStorageService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ConfirmImportModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
