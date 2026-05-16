import { BehaviorSubject } from "rxjs";
import { IStatistics } from "./statistics.service";

export const mockStatisticsMap = new Map() as Map<string, number>;
mockStatisticsMap.set("2025-09-17T00:00:00.000Z", 4);
mockStatisticsMap.set("2025-09-18T00:00:00.000Z", 3);

export const mockStatistics: IStatistics[] = [
	{
		date: "2025-09-17T00:00:00.000Z",
		numberOfPlays: 4,
	},
	{
		date: "2025-09-18T00:00:00.000Z",
		numberOfPlays: 3,
	},
];

export const createMockStatisticsService = () => ({
	statistics$: new BehaviorSubject<Map<string, number>>(mockStatisticsMap),
	registerGame: jasmine.createSpy("registerGame"),
});

export type IMockStatisticsService = ReturnType<typeof createMockStatisticsService>;
