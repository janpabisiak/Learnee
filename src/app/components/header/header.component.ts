import { Component } from "@angular/core";
import { HeaderNavbarComponent } from "./header-navbar/header-navbar.component";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-header",
	imports: [HeaderNavbarComponent, RouterLink],
	templateUrl: "./header.component.html",
	standalone: true,
})
export class HeaderComponent {}
