import { fakeFakenewsEntity } from "@/slices/fakenews/entities/FakenewsEntity.spec";
import { FakenewsEntity } from "@/slices/fakenews/entities";
import { AddFakenewsRepository } from "@/slices/fakenews/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addFakenews } from "./AddFakenews";

describe("addFakenews", () => {
    let testInstance: any;
    let addFakenewsRepository: MockProxy<AddFakenewsRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addFakenewsRepository = mock();
        addFakenewsRepository.addFakenews.mockResolvedValue(fakeFakenewsEntity);
    });
    beforeEach(() => {
        testInstance = addFakenews(addFakenewsRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addFakenews of AddFakenewsRepository with correct values", async () => {
        await testInstance(fakeFakenewsEntity);
        expect(addFakenewsRepository.addFakenews).toHaveBeenCalledWith(
            new FakenewsEntity(fakeFakenewsEntity)
        );
        expect(addFakenewsRepository.addFakenews).toHaveBeenCalledTimes(1);
    });
    it("should return a new fakenews created when addFakenewsRepository insert it", async () => {
        const fakenews = await testInstance(fakeFakenewsEntity);
        expect(fakenews).toEqual(fakeFakenewsEntity);
    });
    it("should return null a new fakenews created when addFakenewsRepository insert it", async () => {
        addFakenewsRepository.addFakenews.mockResolvedValue(null);
        const fakenews = await testInstance(fakeFakenewsEntity);
        expect(fakenews).toBeNull();
    });
    it("should rethrow if addFakenews of AddFakenewsRepository throws", async () => {
        addFakenewsRepository.addFakenews.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeFakenewsEntity)).rejects.toThrowError("any_error");
    });
});
