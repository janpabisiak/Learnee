import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { IToaster } from "../../../types/toaster.interface";
import { ToasterComponent } from "./toaster/toaster.component";

@Component({
	selector: "app-toaster-container",
	imports: [CommonModule, ToasterComponent],
	templateUrl: "./toaster-container.component.html",
})
export class ToasterContainerComponent {
	@Input() toasters: IToaster[] = [];
	@Input() position: EToasterPositions = EToasterPositions.BottomRight;
	toasterPositions = EToasterPositions;
}

export enum EToasterPositions {
	TopLeft = "topLeft",
	TopRight = "topRight",
	BottomLeft = "bottomLeft",
	BottomRight = "bottomRight",
}
