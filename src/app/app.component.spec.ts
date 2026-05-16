import { provideHttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { FooterComponent } from "@components/footer/footer.component";
import { HeaderComponent } from "@components/header/header.component";
import { MobileMenuComponent } from "@components/header/mobile-menu/mobile-menu.component";
import { AddEditWordModalComponent } from "@components/home-page/add-edit-word-modal/add-edit-word-modal.component";
import { SpinnerComponent } from "@components/utils/spinner/spinner.component";
import {
	EToasterPositions,
	ToasterContainerComponent,
} from "@components/utils/toaster-container/toaster-container.component";
import { provideTranslateService } from "@ngx-translate/core";
import { EModalType, ModalService } from "@services/modal/modal.service";
import {
	createMockModalService,
	IMockModalService,
} from "@services/modal/modal.service.mock";
import { ToasterService } from "@services/toaster/toaster.service";
import {
	createMockToasterService,
	IMockToasterService,
	mockToasters,
} from "@services/toaster/toaster.service.mock";
import { WordsService } from "@services/words/words.service";
import {
	createMockWordsService,
	IMockWordsService,
	mockWords,
} from "@services/words/words.service.mock";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
	let fixture: ComponentFixture<AppComponent>;
	let app: AppComponent;
	let mockModalService: IMockModalService;
	let mockToasterService: IMockToasterService;
	let mockWordsService: IMockWordsService;

	beforeEach(async () => {
		mockModalService = createMockModalService();
		mockToasterService = createMockToasterService();
		mockWordsService = createMockWordsService();

		await TestBed.configureTestingModule({
			imports: [
				AppComponent,
				HeaderComponent,
				AddEditWordModalComponent,
				ToasterContainerComponent,
				SpinnerComponent,
				MobileMenuComponent,
				FooterComponent,
			],
			providers: [
				provideHttpClient(),
				provideRouter([]),
				{ provide: ToasterService, useValue: mockToasterService },
				{ provide: ModalService, useValue: mockModalService },
				{ provide: WordsService, useValue: mockWordsService },
				provideTranslateService({
					fallbackLang: "en",
				}),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(AppComponent);
		app = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create the app", () => {
		expect(app).toBeTruthy();
	});

	it("should initialize default values on init", () => {
		expect(app.isWordAddingModalOpen).toBeFalse();
		expect(app.isWordDeletingModalOpen).toBeFalse();
		expect(app.isMobileNavbarOpen).toBeFalse();
		expect(app.isLoading).toBeTrue();
		expect(app.toasters).toEqual([]);
		expect(app.EToasterPositions).toEqual(EToasterPositions);
	});

	it("should start auto removing toasters on init", () => {
		expect(app["toasterService"].startAutoRemoving).toHaveBeenCalledTimes(1);
	});

	it("should add subscriptions to an array", () => {
		const addSubscriptionSpy = spyOn(app["subscriptions"], "add");
		app.ngOnInit();

		expect(addSubscriptionSpy).toHaveBeenCalled();
	});

	it("should set fields values depending on subscriptions", () => {
		mockModalService.isWordAddingModalOpen$.next(true);
		mockModalService.isWordDeletionModalOpen$.next(true);
		mockModalService.isMobileNavbarOpen$.next(true);
		mockWordsService.wordsOfTheDay$.next(mockWords);
		mockToasterService.toasters$.next(mockToasters);

		app.ngOnInit();

		expect(app.isWordAddingModalOpen).toBeTrue();
		expect(app.isWordDeletingModalOpen).toBeTrue();
		expect(app.isMobileNavbarOpen).toBeTrue();
		expect(app.isLoading).toBeFalse();
		expect(app.toasters).toEqual(mockToasters);
	});

	it("should disable mobile navbar on mobile-menu-overlay click", () => {
		const htmlEl = document.createElement("div");
		htmlEl.id = "mobile-menu-overlay";
		app.onClick(htmlEl);

		expect(mockModalService.toggleModal).toHaveBeenCalledOnceWith(
			EModalType.MobileNavbar,
			false,
		);
	});

	it("should NOT disable mobile navbar on click outside mobile-menu-overlay", () => {
		const htmlEl = document.createElement("div");
		app.onClick(htmlEl);

		expect(mockModalService.toggleModal).not.toHaveBeenCalled();
	});

	it("should remove subscriptions on destroy", () => {
		const unsubscribeSpy = spyOn(app["subscriptions"], "unsubscribe");
		app.ngOnDestroy();

		expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
	});
});
