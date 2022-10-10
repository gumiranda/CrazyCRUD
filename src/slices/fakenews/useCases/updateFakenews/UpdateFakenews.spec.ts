import { UpdateFakenewsRepository } from "@/slices/fakenews/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeFakenewsEntity } from "@/slices/fakenews/entities/FakenewsEntity.spec";
import { UpdateFakenews, updateFakenews } from "./UpdateFakenews";

describe("UpdateFakenews", () => {
    let fakeQuery: Query;
    let testInstance: UpdateFakenews;
    let updateFakenewsRepository: MockProxy<UpdateFakenewsRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        updateFakenewsRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        updateFakenewsRepository.updateFakenews.mockResolvedValue(fakeFakenewsEntity);
    });
    beforeEach(() => {
        testInstance = updateFakenews(updateFakenewsRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call updateFakenews of UpdateFakenewsRepository with correct values", async () => {
        await testInstance(fakeQuery, fakeFakenewsEntity);
        expect(updateFakenewsRepository.updateFakenews).toHaveBeenCalledWith(
            fakeQuery,
            fakeFakenewsEntity
        );
        expect(updateFakenewsRepository.updateFakenews).toHaveBeenCalledTimes(1);
    });
    it("should return a fakenews updateed when updateFakenewsRepository insert it", async () => {
        const fakenews = await testInstance(fakeQuery, fakeFakenewsEntity);
        expect(fakenews).toEqual(fakeFakenewsEntity);
    });
    it("should return null a new fakenews updateed when updateFakenewsRepository return it", async () => {
        updateFakenewsRepository.updateFakenews.mockResolvedValue(null);
        const fakenews = await testInstance(fakeQuery, fakeFakenewsEntity);
        expect(fakenews).toBeNull();
    });
    it("should rethrow if updateFakenews of UpdateFakenewsRepository throws", async () => {
        updateFakenewsRepository.updateFakenews.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery, fakeFakenewsEntity)).rejects.toThrowError(
            "any_error"
        );
    });
});
