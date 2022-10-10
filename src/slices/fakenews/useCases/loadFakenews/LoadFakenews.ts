import { LoadFakenewsRepository } from "@/slices/fakenews/repositories";
import { FakenewsData } from "@/slices/fakenews/entities";
import { Query } from "@/application/types";

export type LoadFakenews = (query: Query) => Promise<FakenewsData | null>;
export type LoadFakenewsSignature = (loadFakenews: LoadFakenewsRepository) => LoadFakenews;
export const loadFakenews: LoadFakenewsSignature =
    (loadFakenewsRepository: LoadFakenewsRepository) => async (query: Query) => {
        return loadFakenewsRepository.loadFakenews(query);
    };
