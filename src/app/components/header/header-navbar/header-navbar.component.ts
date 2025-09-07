import { Component } from "@angular/core";
import { HeaderNavbarItemComponent } from "./header-navbar-item/header-navbar-item.component";

@Component({
	selector: "app-header-navbar",
	imports: [HeaderNavbarItemComponent],
	templateUrl: "./header-navbar.component.html",
})
export class HeaderNavbarComponent {
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
}
