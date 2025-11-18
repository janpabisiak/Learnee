import { LocalStorageService } from "./local-storage.service";

describe("LocalStorageService", () => {
	let service: LocalStorageService;

	beforeEach(() => {
		service = new LocalStorageService();
	});

	describe("loadData()", () => {
		it("should return data from localStorage if found", () => {
			localStorage.setItem("test", "test1");
			const result = service.loadData("test");

			expect(result).toBe("test1");
		});

		it("should return false if no value in localStorage for given key", () => {
			localStorage.removeItem("test");
			const result = service.loadData("test");

			expect(result).toBeFalse();
		});
	});

	describe("saveData()", () => {
		it("should save data in localStorage", () => {
			service.saveData("test", "test3");

			expect(service.loadData("test")).toBe("test3");
		});

		it("should set hasKeys property to true", () => {
			service.saveData("test", "test3");

			expect(service["hasKeys"].value).toBeTrue();
		});
	});

	describe("exportData()", () => {
		it("should call getLocalStorageAsJson()", () => {
			const spy = spyOn(service as any, "getLocalStorageAsJson");
			service.exportData();

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it("should call downloadData()", () => {
			const spy = spyOn(service as any, "downloadData");
			service.exportData();

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe("deleteData()", () => {
		it("should delete all data from localStorage", () => {
			localStorage.setItem("test", "test10");
			let localStorageAsJson = service["getLocalStorageAsJson"]();

			expect(localStorageAsJson).toContain('"test": "test10"');

			service.deleteData();
			localStorageAsJson = service["getLocalStorageAsJson"]();

			expect(localStorageAsJson).toBe("{}");
		});

		it("should set hasKeys property to false", () => {
			localStorage.setItem("test", "test5");
			service.deleteData();

			expect(service["hasKeys"].value).toBeFalse();
		});
	});

	describe("getLocalStorageAsJson()", () => {
		it("should return all data saved in localStorage as string", () => {
			service.saveData("test", "test3");
			const result = service["getLocalStorageAsJson"]();

			expect(result).toContain('"test": "test3"');
		});

		it("should return '{}' if there is no data in localStorage", () => {
			localStorage.clear();
			const result = service["getLocalStorageAsJson"]();

			expect(result).toBe("{}");
		});
	});
});
