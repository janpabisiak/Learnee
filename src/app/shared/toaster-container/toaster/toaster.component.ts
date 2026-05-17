import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from "@angular/core";

@Component({
	selector: "app-toaster",
	imports: [CommonModule],
	templateUrl: "./toaster.component.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToasterComponent {
	@Input({ required: true }) content!: string;
	@Input() type: EToasterTypes = EToasterTypes.Success;
	@Input() duration = 5;
	toasterTypes = EToasterTypes;
}

export enum EToasterTypes {
	Success = "success",
	Loading = "loading",
	Error = "error",
}
