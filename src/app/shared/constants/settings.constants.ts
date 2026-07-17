import { ELocalStorageKeys } from "./local-storage.constants";

export enum EAvailableLanguages {
	English = "en-US",
	Polish = "pl-PL",
}

export type SaveSettingsInput =
	| { key: ELocalStorageKeys.DarkMode; value: boolean }
	| { key: ELocalStorageKeys.FetchWordDefinition; value: boolean }
	| { key: ELocalStorageKeys.Language; value: EAvailableLanguages }
	| { key: ELocalStorageKeys.FetchWotd; value: boolean }
	| { key: ELocalStorageKeys.StatisticsEnabled; value: boolean };

export type SettingsKeys = SaveSettingsInput["key"];

export const defaultSettings: Record<SettingsKeys, any> = {
	[ELocalStorageKeys.DarkMode]: false,
	[ELocalStorageKeys.FetchWordDefinition]: false,
	[ELocalStorageKeys.Language]: EAvailableLanguages.English,
	[ELocalStorageKeys.FetchWotd]: true,
	[ELocalStorageKeys.StatisticsEnabled]: true,
};
