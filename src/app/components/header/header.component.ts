import { Component } from "@angular/core";
import { HeaderNavbarComponent } from "./header-navbar/header-navbar.component";
import { HamburgerComponent } from "./hamburger/hamburger.component";
import { LogoComponent } from "./logo/logo.component";

@Component({
	selector: "app-header",
	imports: [HeaderNavbarComponent, HamburgerComponent, LogoComponent],
	templateUrl: "./header.component.html",
	standalone: true,
})
export class HeaderComponent {}
