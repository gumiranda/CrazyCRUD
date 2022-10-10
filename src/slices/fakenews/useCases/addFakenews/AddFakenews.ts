import { AddFakenewsRepository } from "@/slices/fakenews/repositories";
import { FakenewsEntity, FakenewsData } from "@/slices/fakenews/entities";

export type AddFakenews = (data: FakenewsData) => Promise<FakenewsEntity | null>;
export type AddFakenewsSignature = (addFakenews: AddFakenewsRepository) => AddFakenews;
export const addFakenews: AddFakenewsSignature =
    (addFakenewsRepository: AddFakenewsRepository) => (data: FakenewsData) => {
        return addFakenewsRepository.addFakenews(new FakenewsEntity(data));
    };
