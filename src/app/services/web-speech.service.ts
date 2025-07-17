import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class WebSpeechService {
	synth = window.speechSynthesis;

	readText(text: string) {
		const utterance = new SpeechSynthesisUtterance(text);
		this.synth.speak(utterance);
	}

	getVoices() {
		return this.synth.getVoices();
	}
}
