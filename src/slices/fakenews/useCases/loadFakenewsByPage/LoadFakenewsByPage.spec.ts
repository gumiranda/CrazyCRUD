import { LoadFakenewsByPageRepository } from "@/slices/fakenews/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeFakenewsPaginated } from "@/slices/fakenews/entities/FakenewsEntity.spec";
import { LoadFakenewsByPage, loadFakenewsByPage } from "./LoadFakenewsByPage";

describe("LoadFakenewsByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadFakenewsByPage;
    let loadFakenewsByPageRepository: MockProxy<LoadFakenewsByPageRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadFakenewsByPageRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadFakenewsByPageRepository.loadFakenewsByPage.mockResolvedValue(
            fakeFakenewsPaginated
        );
    });
    beforeEach(() => {
        testInstance = loadFakenewsByPage(loadFakenewsByPageRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadFakenewsByPage of LoadFakenewsByPageRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadFakenewsByPageRepository.loadFakenewsByPage).toHaveBeenCalledWith(
            fakeQuery
        );
        expect(loadFakenewsByPageRepository.loadFakenewsByPage).toHaveBeenCalledTimes(1);
    });
    it("should return a fakenews loaded when loadFakenewsByPageRepository insert it", async () => {
        const fakenews = await testInstance(fakeQuery);
        expect(fakenews).toEqual(fakeFakenewsPaginated);
    });
    it("should return null a new fakenews loaded when loadFakenewsByPageRepository return it", async () => {
        loadFakenewsByPageRepository.loadFakenewsByPage.mockResolvedValue(null);
        const fakenews = await testInstance(fakeQuery);
        expect(fakenews).toBeNull();
    });
    it("should rethrow if loadFakenewsByPage of LoadFakenewsByPageRepository throws", async () => {
        loadFakenewsByPageRepository.loadFakenewsByPage.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
