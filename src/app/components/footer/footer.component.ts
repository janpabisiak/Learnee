import { Component, OnInit } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
	selector: "app-footer",
	imports: [TranslatePipe],
	templateUrl: "./footer.component.html",
})
export class FooterComponent implements OnInit {
	currentYear!: number;

	ngOnInit() {
		this.currentYear = new Date().getFullYear();
	}
}
