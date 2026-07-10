import { EToasterTypes } from "@shared/constants/toaster.constants";

export interface IToaster {
	id: number;
	type: EToasterTypes;
	content: string;
	duration: number;
	expirationTimestamp: number;
}
