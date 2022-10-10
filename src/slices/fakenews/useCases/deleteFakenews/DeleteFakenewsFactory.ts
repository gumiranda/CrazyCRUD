import { MongoRepository } from "@/application/infra";
import { FakenewsRepository } from "@/slices/fakenews/repositories";
import { deleteFakenews, DeleteFakenews } from "@/slices/fakenews/useCases";

export const makeDeleteFakenewsFactory = (): DeleteFakenews => {
  const repository = new FakenewsRepository(new MongoRepository("fakenews"));
  return deleteFakenews(repository);
};
