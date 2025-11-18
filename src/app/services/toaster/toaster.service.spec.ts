import { EToasterTypes } from "@components/utils/toaster-container/toaster/toaster.component";
import { ToasterService } from "./toaster.service";
import { mockToasters } from "app/app.component.spec";

describe("ToasterService", () => {
	let service: ToasterService;

	beforeEach(() => {
		service = new ToasterService();
	});

	describe("addToaster()", () => {
		it("should create toaster regarding to default data", () => {
			service.addToaster({ content: "Test" } as any);

			expect(service["toasters"].value).toContain({
				id: 0,
				type: EToasterTypes.Success,
				content: "Test",
				duration: 5,
				expirationTimestamp: new Date().getTime() + 5 * 1000,
			});
		});

		it("should create toaster regarding to given data", () => {
			service.addToaster({ type: EToasterTypes.Error, content: "Test2", duration: 9 } as any);

			expect(service["toasters"].value).toContain({
				id: 0,
				type: EToasterTypes.Error,
				content: "Test2",
				duration: 9,
				expirationTimestamp: new Date().getTime() + 9 * 1000,
			});
		});
	});

	describe("startAutoRemoving()", () => {
		it("should create setInterval for toasters cleanup", () => {
			const spy = spyOn(window, "setInterval");
			service.startAutoRemoving();

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe("filterToasters()", () => {
		it("should filter expired toasters", () => {
			service["toasters"].next([
				...mockToasters,
				{
					id: 2,
					type: EToasterTypes.Loading,
					content: "Loading...",
					duration: 3,
					expirationTimestamp: new Date().getTime() - 3 * 1000,
				},
			]);

			service["filterToasters"]();

			expect(service["toasters"].value).toEqual(mockToasters);
		});
	});
});
