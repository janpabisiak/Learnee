import { NgClass } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from "@angular/core";
import { ModalService } from "@services/modal/modal.service";
import { EModalType } from "@shared/constants/modal.constants";
import { Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-hamburger",
	imports: [NgClass],
	templateUrl: "./hamburger.component.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HamburgerComponent implements OnInit, OnDestroy {
	mobileNavbarOpen = false;
	private destroy$ = new Subject<void>();

	constructor(private modalService: ModalService) {}

	ngOnInit() {
		this.modalService.mobileNavbarOpen$
			.pipe(takeUntil(this.destroy$))
			.subscribe((mobileNavbarOpen) => {
				this.mobileNavbarOpen = mobileNavbarOpen;
			});
	}

	toggleNavbarMenu() {
		this.modalService.toggleModal(EModalType.MobileNavbar, !this.mobileNavbarOpen);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
