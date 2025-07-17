import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "sentencecase",
})
export class SentenceCasePipe implements PipeTransform {
	transform(value: any, ...args: any[]) {
		return value[0].toUpperCase() + value.slice(1);
	}
}
