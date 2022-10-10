import { MongoRepository } from "@/application/infra";
import { FakenewsRepository } from "@/slices/fakenews/repositories";
import { loadFakenewsByPage, LoadFakenewsByPage } from "@/slices/fakenews/useCases";

export const makeLoadFakenewsByPageFactory = (): LoadFakenewsByPage => {
  const repository = new FakenewsRepository(new MongoRepository("fakenews"));
  return loadFakenewsByPage(repository);
};
