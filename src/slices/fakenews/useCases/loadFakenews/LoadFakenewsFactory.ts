import { MongoRepository } from "@/application/infra";
import { FakenewsRepository } from "@/slices/fakenews/repositories";
import { loadFakenews, LoadFakenews } from "@/slices/fakenews/useCases";

export const makeLoadFakenewsFactory = (): LoadFakenews => {
  const repository = new FakenewsRepository(new MongoRepository("fakenews"));
  return loadFakenews(repository);
};
