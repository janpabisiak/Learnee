import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { HeaderNavbarItemComponent } from "./header-navbar-item/header-navbar-item.component";

@Component({
	selector: "app-header-navbar",
	imports: [HeaderNavbarItemComponent],
	templateUrl: "./header-navbar.component.html",
})
export class HeaderNavbarComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();
	currentUrl: string = "";
	navLinks = [
		{
			id: 0,
			url: "/",
			text: "Home",
			icon: "home-outline",
		},
		{
			id: 1,
			url: "/folders",
			text: "Folders",
			icon: "folder-outline",
		},
		{
			id: 2,
			url: "/study",
			text: "Study",
			icon: "school-outline",
		},
		{
			id: 3,
			url: "/settings",
			text: "Settings",
			icon: "settings-outline",
		},
	];

	constructor(private router: Router) {}

	ngOnInit() {
		this.router.events.pipe(takeUntil(this.destroy$)).subscribe((e) => {
			if (e instanceof NavigationStart) {
				this.currentUrl = e.url;
			}
		});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
