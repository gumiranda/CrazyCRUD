import { fakeFakenewsEntity } from "@/slices/fakenews/entities/FakenewsEntity.spec";
import { FakenewsEntity } from "@/slices/fakenews/entities";
import { DeleteFakenewsRepository } from "@/slices/fakenews/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteFakenews } from "./DeleteFakenews";
import { Query } from "@/application/types";

describe("deleteFakenews", () => {
    let testInstance: any;
    let fakeQuery: Query;
    let deleteFakenewsRepository: MockProxy<DeleteFakenewsRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        deleteFakenewsRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        deleteFakenewsRepository.deleteFakenews.mockResolvedValue(fakeFakenewsEntity);
    });
    beforeEach(() => {
        testInstance = deleteFakenews(deleteFakenewsRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call deleteFakenews of DeleteFakenewsRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(deleteFakenewsRepository.deleteFakenews).toHaveBeenCalledWith(fakeQuery);
        expect(deleteFakenewsRepository.deleteFakenews).toHaveBeenCalledTimes(1);
    });
    it("should return a new fakenews deleted when deleteFakenewsRepository delete it", async () => {
        const fakenews = await testInstance(fakeQuery);
        expect(fakenews).toEqual(fakeFakenewsEntity);
    });
    it("should return null a new fakenews deleted when deleteFakenewsRepository delete it", async () => {
        deleteFakenewsRepository.deleteFakenews.mockResolvedValue(null);
        const fakenews = await testInstance(fakeFakenewsEntity);
        expect(fakenews).toBeNull();
    });
    it("should rethrow if deleteFakenews of DeleteFakenewsRepository throws", async () => {
        deleteFakenewsRepository.deleteFakenews.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
