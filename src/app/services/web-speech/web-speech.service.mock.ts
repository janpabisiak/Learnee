export const createMockWebSpeechService = () => ({
	readText: jasmine.createSpy("readText"),
	getVoices: jasmine.createSpy("getVoices").and.returnValue([]),
});

export type IMockWebSpeechService = ReturnType<typeof createMockWebSpeechService>;
