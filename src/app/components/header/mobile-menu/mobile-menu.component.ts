import { Component } from "@angular/core";
import { LogoComponent } from "../logo/logo.component";
import { HeaderNavbarComponent } from "../header-navbar/header-navbar.component";

@Component({
	selector: "app-mobile-menu",
	imports: [LogoComponent, HeaderNavbarComponent],
	templateUrl: "./mobile-menu.component.html",
})
export class MobileMenuComponent {}
