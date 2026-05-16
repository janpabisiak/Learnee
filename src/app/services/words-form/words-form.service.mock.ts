import { BehaviorSubject } from "rxjs";

export const createMockWordsFormService = () => ({
	isSubmitAttempted$: new BehaviorSubject<boolean>(false),
	isSubmitDisabled$: new BehaviorSubject<boolean>(false),
	setupSubscriptions: jasmine.createSpy("setupSubscriptions"),
	setupForEditing: jasmine.createSpy("setupForEditing"),
	isFormValid: jasmine.createSpy("isFormValid"),
	submitForm: jasmine.createSpy("submitForm"),
	reset: jasmine.createSpy("reset"),
	getIsEditing: jasmine.createSpy("getIsEditing"),
	form: {
		markAllAsTouched: jasmine.createSpy("markAllAsTouched"),
	},
});

export type IMockWordsFormService = ReturnType<typeof createMockWordsFormService>;
