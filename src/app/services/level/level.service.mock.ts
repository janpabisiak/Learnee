import { BehaviorSubject } from "rxjs";

export const createMockLevelService = () => ({
	xpPoints$: new BehaviorSubject<number>(0),
	level$: new BehaviorSubject<number>(0),
	addXpPoints: jasmine.createSpy("addXpPoints"),
	removeXpPoints: jasmine.createSpy("removeXpPoints"),
	calcNeededXp: jasmine.createSpy("calcNeededXp").and.callFake((level: number) => {
		let xp = 0;
		for (let i = 1; i <= level; i++) {
			xp += i * 50;
		}
		return xp;
	}),
});

export type IMockLevelService = ReturnType<typeof createMockLevelService>;
