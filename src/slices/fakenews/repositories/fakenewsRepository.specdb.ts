import {
    fakeFakenewsEntity,
    fakeFakenewsPaginated,
} from "@/slices/fakenews/entities/FakenewsEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { FakenewsRepository } from "./fakenewsRepository";

describe("Fakenews Mongo Repository", () => {
    let fakeQuery: Query;
    let testInstance: FakenewsRepository;
    let repository: MockProxy<Repository>;
    beforeAll(async () => {
        fakeQuery = { fields: { name: "123" }, options: {} };
        MockDate.set(new Date());
        repository = mock<Repository>();
        repository.add.mockResolvedValue(fakeFakenewsEntity);
        repository.getOne.mockResolvedValue(fakeFakenewsEntity);
        repository.update.mockResolvedValue(fakeFakenewsEntity);
        repository.getPaginate.mockResolvedValue(fakeFakenewsPaginated?.fakenewss);
        repository.getCount.mockResolvedValue(fakeFakenewsPaginated?.total);
        repository.deleteOne.mockResolvedValue(true);
    });
    beforeEach(async () => {
        testInstance = new FakenewsRepository(repository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    test("should call add of addFakenews with correct values", async () => {
        await testInstance.addFakenews(fakeFakenewsEntity);
        expect(repository.add).toHaveBeenCalledWith(fakeFakenewsEntity);
        expect(repository.add).toHaveBeenCalledTimes(1);
    });
    test("should return a new fakenews created when addFakenews insert it", async () => {
        const result = await testInstance.addFakenews(fakeFakenewsEntity);
        expect(result).toEqual(fakeFakenewsEntity);
    });
    test("should return null when addFakenews returns null", async () => {
        repository.add.mockResolvedValueOnce(null);
        const result = await testInstance.addFakenews(fakeFakenewsEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if add of addFakenews throws", async () => {
        repository.add.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.addFakenews(fakeFakenewsEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should rethrow if update of updateFakenews throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateFakenews(fakeQuery, fakeFakenewsEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call update of updateFakenews with correct values", async () => {
        await testInstance.updateFakenews(fakeQuery, fakeFakenewsEntity);
        expect(repository.update).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeFakenewsEntity
        );
        expect(repository.update).toHaveBeenCalledTimes(1);
    });
    test("should return a fakenews updated when updateFakenews update it", async () => {
        const result = await testInstance.updateFakenews(fakeQuery, fakeFakenewsEntity);
        expect(result).toEqual(fakeFakenewsEntity);
    });
    test("should return a fakenews updated when updateFakenews update it when i pass null", async () => {
        const result = await testInstance.updateFakenews(null as any, fakeFakenewsEntity);
        expect(result).toEqual(fakeFakenewsEntity);
    });
    test("should return null when updateFakenews returns null", async () => {
        repository.update.mockResolvedValueOnce(null);
        const result = await testInstance.updateFakenews(fakeQuery, fakeFakenewsEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if update of updateFakenews throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateFakenews(fakeQuery, fakeFakenewsEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call delete of deleteFakenews with correct values", async () => {
        await testInstance.deleteFakenews(fakeQuery);
        expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.deleteOne).toHaveBeenCalledTimes(1);
    });
    test("should return a new fakenews created when deleteFakenews insert it", async () => {
        const result = await testInstance.deleteFakenews(fakeQuery);
        expect(result).toEqual(true);
    });
    test("should return null when deleteFakenews returns null", async () => {
        repository.deleteOne.mockResolvedValueOnce(null);
        const result = await testInstance.deleteFakenews(fakeQuery);
        expect(result).toBeNull();
    });
    test("should rethrow if delete of deleteFakenews throws", async () => {
        repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.deleteFakenews(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call load of loadFakenews with correct values", async () => {
        await testInstance.loadFakenews(fakeQuery);
        expect(repository.getOne).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeQuery?.options
        );
        expect(repository.getOne).toHaveBeenCalledTimes(1);
    });
    test("should return a fakenews when loadFakenews loaded it", async () => {
        const result = await testInstance.loadFakenews(fakeQuery);
        expect(result).toEqual(fakeFakenewsEntity);
    });
    test("should return null when loadFakenews returns null", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadFakenews(fakeQuery);
        expect(result).toBeNull();
    });
    test("should return null when loadFakenews returns null passing null as parameter", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadFakenews(null as any);
        expect(result).toBeNull();
    });
    test("should rethrow if load of loadFakenews throws", async () => {
        repository.getOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadFakenews(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call getCount of loadFakenewsByPage with correct values", async () => {
        await testInstance.loadFakenewsByPage(fakeQuery);
        expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.getCount).toHaveBeenCalledTimes(1);
    });
    test("should call getPaginate of loadFakenewsByPage with correct values", async () => {
        await testInstance.loadFakenewsByPage(fakeQuery);
        expect(repository.getPaginate).toHaveBeenCalledWith(
            0,
            fakeQuery?.fields,
            {
                createdAt: -1,
            },
            10,
            {}
        );
        expect(repository.getPaginate).toHaveBeenCalledTimes(1);
    });
    test("should return a fakenewsByPage when loadFakenewsByPage loaded it", async () => {
        const result = await testInstance.loadFakenewsByPage(fakeQuery);
        expect(result).toEqual(fakeFakenewsPaginated);
    });
    test("should return null when loadFakenewsByPage returns null", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadFakenewsByPage(fakeQuery);
        expect(result).toEqual({ fakenewss: null, total: 0 });
    });
    test("should return null when loadFakenewsByPage returns null passing null as parameter", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadFakenewsByPage(null as any);
        expect(result).toEqual({ fakenewss: null, total: 0 });
    });
    test("should rethrow if load of loadFakenewsByPage throws", async () => {
        repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadFakenewsByPage(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
});
