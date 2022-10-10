import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateFakenewsController } from "./updateFakenewsController";
import { fakeFakenewsEntity } from "@/slices/fakenews/entities/FakenewsEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateFakenewsController", () => {
  let testInstance: UpdateFakenewsController;
  let updateFakenews: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateFakenews = jest.fn();
    updateFakenews.mockResolvedValue({
      ...fakeFakenewsEntity,
      createdById: fakeUserEntity?._id,
    });
    validationQuery = mock();
    validationQuery.validate.mockResolvedValue([] as never);
    validationBody = mock();
    validationBody.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new UpdateFakenewsController(
      validationQuery,
      validationBody,
      updateFakenews
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeFakenewsEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeFakenewsEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeFakenewsEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeFakenewsEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateFakenews with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeFakenewsEntity,
      query: fakeFakenewsEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeFakenewsEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateFakenews).toHaveBeenCalledWith(
       {
        fields: {
         ...fakeFakenewsEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeFakenewsEntity
    );
    expect(updateFakenews).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateFakenews throw", async () => {
    updateFakenews.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeFakenewsEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeFakenewsEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeFakenewsEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
