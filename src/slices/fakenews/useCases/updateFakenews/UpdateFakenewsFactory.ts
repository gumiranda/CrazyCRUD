import { MongoRepository } from "@/application/infra";
import { FakenewsRepository } from "@/slices/fakenews/repositories";
import { updateFakenews, UpdateFakenews } from "@/slices/fakenews/useCases";

export const makeUpdateFakenewsFactory = (): UpdateFakenews => {
  const repository = new FakenewsRepository(new MongoRepository("fakenews"));
  return updateFakenews(repository);
};
