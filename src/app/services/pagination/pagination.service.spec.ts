import { mockWords } from "app/app.component.spec";
import { PaginationService } from "./pagination.service";

describe("PaginationService", () => {
	let service: PaginationService;

	beforeEach(() => {
		service = new PaginationService();
	});

	describe("setPage()", () => {
		it("should increment page value if give one is correct", () => {
			service["page"].next(2);
			service["maxPage"].next(5);
			service.setPage(3);

			expect(service["page"].value).toBe(3);
		});

		it("should set page value to 1 if give one is NOT correct", () => {
			service["page"].next(1);
			service["maxPage"].next(1);
			service.setPage(2);

			expect(service["page"].value).toBe(1);
		});
	});

	describe("calcMaxPage()", () => {
		it("should calculate maxPage", () => {
			service["numberOfWords"] = 10;
			service["wordsPerPage"].next(5);
			service["calcMaxPage"]();

			expect(service["maxPage"].value).toBe(2);
		});

		it("should update page value if too big", () => {
			service["numberOfWords"] = 10;
			service["wordsPerPage"].next(5);
			service["page"].next(20);
			service["calcMaxPage"]();

			expect(service["page"].value).toBe(2);
		});
	});

	describe("calcResultRange()", () => {
		it("should calculate result range when enough words to fill all pages", () => {
			service["page"].next(2);
			service["wordsPerPage"].next(5);
			service["numberOfWords"] = 10;
			service["calcResultRange"]();

			expect(service["resultRange"].value).toEqual({
				start: 5,
				end: 10,
			});
		});

		it("should calculate result range when NOT enough words to fill all pages", () => {
			service["page"].next(2);
			service["wordsPerPage"].next(5);
			service["numberOfWords"] = 8;
			service["calcResultRange"]();

			expect(service["resultRange"].value).toEqual({
				start: 5,
				end: 8,
			});
		});
	});

	describe("setWordsPerPage()", () => {
		it("should set wordsPerPage value", () => {
			service.setWordsPerPage(20);

			expect(service["wordsPerPage"].value).toBe(20);
		});
	});

	describe("paginateWordList()", () => {
		it("should call calcMaxPage and calcResultRange", () => {
			const calcMaxPageSpy = spyOn(service as any, "calcMaxPage");
			const calcResultRangeSpy = spyOn(service as any, "calcResultRange");
			service.paginateWordList(mockWords);

			expect(calcMaxPageSpy).toHaveBeenCalledTimes(1);
			expect(calcResultRangeSpy).toHaveBeenCalledTimes(1);
		});

		it("should return sliced arr", () => {
			service["wordsPerPage"].next(1);
			service["page"].next(1);
			const result = service.paginateWordList(mockWords);

			expect(result).toEqual([mockWords[0]]);
		});
	});
});
