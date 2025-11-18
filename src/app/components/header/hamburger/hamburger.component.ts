import { NgClass } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from "@angular/core";
import { EModalType, ModalService } from "@services/modal/modal.service";
import { Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-hamburger",
	imports: [NgClass],
	templateUrl: "./hamburger.component.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HamburgerComponent implements OnInit, OnDestroy {
	isMobileNavbarOpen = false;
	private destroy$ = new Subject<void>();

	constructor(private modalService: ModalService) {}

	ngOnInit() {
		this.modalService.isMobileNavbarOpen$
			.pipe(takeUntil(this.destroy$))
			.subscribe((isMobileNavbarOpen) => {
				this.isMobileNavbarOpen = isMobileNavbarOpen;
			});
	}

	toggleNavbarMenu() {
		this.modalService.toggleModal(EModalType.MobileNavbar, !this.isMobileNavbarOpen);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
