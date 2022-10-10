import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddFakenewsController } from "./addFakenewsController";
import { fakeFakenewsEntity } from "@/slices/fakenews/entities/FakenewsEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddFakenewsController", () => {
  let testInstance: AddFakenewsController;
  let addFakenews: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addFakenews = jest.fn();
    addFakenews.mockResolvedValue({
      ...fakeFakenewsEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddFakenewsController(validation, addFakenews);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeFakenewsEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeFakenewsEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addFakenews with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeFakenewsEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeFakenewsEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addFakenews).toHaveBeenCalledWith({
      ...fakeFakenewsEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addFakenews).toHaveBeenCalledTimes(1);
  });
  test("should throws if addFakenews throw", async () => {
    addFakenews.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeFakenewsEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeFakenewsEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
