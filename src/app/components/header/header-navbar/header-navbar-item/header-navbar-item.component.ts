import { NgClass } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
	selector: "app-header-navbar-item",
	imports: [RouterLink, NgClass, TranslatePipe],
	templateUrl: "./header-navbar-item.component.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderNavbarItemComponent {
	@Input({ required: true }) url!: string;
	@Input({ required: true }) isActive!: boolean;
	@Input({ required: true }) text!: string;
	@Input({ required: true }) icon!: string;
}
