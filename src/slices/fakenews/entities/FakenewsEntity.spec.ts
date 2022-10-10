import { FakenewsEntity } from "./FakenewsEntity";
import MockDate from "mockdate";

export const fakeFakenewsEntity = {
  _id: "123",
  createdById: "123",
  sigiloDe100Anos: true,
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const fakeFakenewsPaginated = {
  total: 11,
  fakenewss: [
    fakeFakenewsEntity,
    fakeFakenewsEntity,
    fakeFakenewsEntity,
    fakeFakenewsEntity,
    fakeFakenewsEntity,
    fakeFakenewsEntity,
    fakeFakenewsEntity,
    fakeFakenewsEntity,
    fakeFakenewsEntity,
    fakeFakenewsEntity,
    fakeFakenewsEntity,
  ],
};

describe("Fakenews", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new FakenewsEntity(fakeFakenewsEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakeFakenewsEntity,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
