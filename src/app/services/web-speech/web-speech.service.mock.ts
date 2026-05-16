export const createMockWebSpeechService = () => ({
	readText: jasmine.createSpy("readText"),
});

export type IMockWebSpeechService = ReturnType<typeof createMockWebSpeechService>;
