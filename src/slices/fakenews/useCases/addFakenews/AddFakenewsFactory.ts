import { MongoRepository } from "@/application/infra";
import { FakenewsRepository } from "@/slices/fakenews/repositories";
import { addFakenews, AddFakenews } from "@/slices/fakenews/useCases";

export const makeAddFakenewsFactory = (): AddFakenews => {
  const repository = new FakenewsRepository(new MongoRepository("fakenews"));
  return addFakenews(repository);
};
