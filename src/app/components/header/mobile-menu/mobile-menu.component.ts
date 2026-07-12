import { Component, inject, OnInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { ModalService } from "@services/modal/modal.service";
import { Subject, takeUntil } from "rxjs";
import { HeaderNavbarComponent } from "../header-navbar/header-navbar.component";
import { LogoComponent } from "../logo/logo.component";
import { EModalType } from "@shared/constants/modal.constants";

@Component({
	selector: "app-mobile-menu",
	imports: [LogoComponent, HeaderNavbarComponent],
	templateUrl: "./mobile-menu.component.html",
})
export class MobileMenuComponent implements OnInit {
	private modalService = inject(ModalService);
	private router = inject(Router);
	private destroy$ = new Subject<void>();

	ngOnInit() {
		this.router.events.pipe(takeUntil(this.destroy$)).subscribe((e) => {
			if (e instanceof NavigationStart) {
				this.modalService.toggleModal(EModalType.MobileNavbar, false);
			}
		});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
