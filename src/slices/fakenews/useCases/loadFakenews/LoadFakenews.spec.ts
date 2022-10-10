import { LoadFakenewsRepository } from "@/slices/fakenews/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeFakenewsEntity } from "@/slices/fakenews/entities/FakenewsEntity.spec";
import { LoadFakenews, loadFakenews } from "./LoadFakenews";

describe("LoadFakenews", () => {
    let fakeQuery: Query;
    let testInstance: LoadFakenews;
    let loadFakenewsRepository: MockProxy<LoadFakenewsRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadFakenewsRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadFakenewsRepository.loadFakenews.mockResolvedValue(fakeFakenewsEntity);
    });
    beforeEach(() => {
        testInstance = loadFakenews(loadFakenewsRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadFakenews of LoadFakenewsRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadFakenewsRepository.loadFakenews).toHaveBeenCalledWith(fakeQuery);
        expect(loadFakenewsRepository.loadFakenews).toHaveBeenCalledTimes(1);
    });
    it("should return a fakenews loaded when loadFakenewsRepository insert it", async () => {
        const fakenews = await testInstance(fakeQuery);
        expect(fakenews).toEqual(fakeFakenewsEntity);
    });
    it("should return null a new fakenews loaded when loadFakenewsRepository return it", async () => {
        loadFakenewsRepository.loadFakenews.mockResolvedValue(null);
        const fakenews = await testInstance(fakeQuery);
        expect(fakenews).toBeNull();
    });
    it("should rethrow if loadFakenews of LoadFakenewsRepository throws", async () => {
        loadFakenewsRepository.loadFakenews.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
