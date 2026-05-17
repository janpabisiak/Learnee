import { EToasterTypes } from "@shared/toaster-container/toaster/toaster.component";

export interface IToaster {
	id: number;
	type: EToasterTypes;
	content: string;
	duration: number;
	expirationTimestamp: number;
}
