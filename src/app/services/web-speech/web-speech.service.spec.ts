import { WebSpeechService } from "./web-speech.service";

describe("WebSpeechService", () => {
	let service: WebSpeechService;
	let mockSynth: any;

	beforeEach(() => {
		mockSynth = {
			speak: jasmine.createSpy("speak"),
			cancel: jasmine.createSpy("cancel"),
			getVoices: jasmine.createSpy("getVoices"),
		};

		service = new WebSpeechService();
		service["synth"] = mockSynth;
	});

	describe("readText()", () => {
		it("should cancel existing synthesis", () => {
			service.readText("Test");

			expect(mockSynth.cancel).toHaveBeenCalledTimes(1);
		});

		it("should read given phrase", () => {
			service.readText("Test");

			expect(mockSynth.speak).toHaveBeenCalledTimes(1);
		});
	});

	describe("getVoices()", () => {
		it("should return voices list", () => {
			const fakeVoices = [{ name: "Voice1" }, { name: "Voice2" }];
			mockSynth.getVoices.and.returnValue(fakeVoices);

			const result = service.getVoices();

			expect(mockSynth.getVoices).toHaveBeenCalledTimes(1);
			expect(result).toEqual(fakeVoices as any);
		});
	});
});
