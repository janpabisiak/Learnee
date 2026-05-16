import { EToasterTypes } from "@components/utils/toaster-container/toaster/toaster.component";
import { IToaster } from "../../types/toaster.interface";
import { BehaviorSubject } from "rxjs";

export const mockToasters: IToaster[] = [
	{
		id: 0,
		content: "test",
		duration: 5,
		expirationTimestamp: new Date().getTime() + 5 * 1000,
		type: EToasterTypes.Success,
	},
	{
		id: 1,
		content: "test_2",
		duration: 7,
		expirationTimestamp: new Date().getTime() + 7 * 1000,
		type: EToasterTypes.Error,
	},
];

export const createMockToasterService = () => ({
	toasters$: new BehaviorSubject<IToaster[]>([]),
	startAutoRemoving: jasmine.createSpy("startAutoRemoving"),
});

export type IMockToasterService = ReturnType<typeof createMockToasterService>;
