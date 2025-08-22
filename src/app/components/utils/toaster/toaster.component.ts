import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from "@angular/core";

@Component({
	selector: "app-toaster",
	imports: [CommonModule],
	templateUrl: "./toaster.component.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToasterComponent {
	@Input() position: EToasterPositions = EToasterPositions.BottomRight;
	@Input({ required: true }) content!: string;
	@Input() type: EToasterTypes = EToasterTypes.Success;
	@Input() showDuration = 5;
	toasterPositions = EToasterPositions;
	toasterTypes = EToasterTypes;
}

export enum EToasterPositions {
	TopLeft = "topLeft",
	TopRight = "topRight",
	BottomLeft = "bottomLeft",
	BottomRight = "bottomRight",
}

export enum EToasterTypes {
	Success = "success",
	Loading = "loading",
	Error = "error",
}
