import { Component, OnInit } from "@angular/core";
import { HeaderNavbarItemComponent } from "./header-navbar-item/header-navbar-item.component";
import { ActivatedRoute, NavigationStart, Route, Router } from "@angular/router";

@Component({
	selector: "app-header-navbar",
	imports: [HeaderNavbarItemComponent],
	templateUrl: "./header-navbar.component.html",
})
export class HeaderNavbarComponent implements OnInit {
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
	];

	constructor(private router: Router) {}

	ngOnInit() {
		this.router.events.subscribe((e) => {
			if (e instanceof NavigationStart) {
				this.currentUrl = e.url;
			}
		});
	}
}
