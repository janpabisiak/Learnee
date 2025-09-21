import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-footer",
	imports: [],
	templateUrl: "./footer.component.html",
})
export class FooterComponent implements OnInit {
	currentYear!: number;

	ngOnInit() {
		this.currentYear = new Date().getFullYear();
	}
}
