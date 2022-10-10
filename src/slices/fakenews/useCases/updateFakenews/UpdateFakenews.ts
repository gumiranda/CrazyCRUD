import { UpdateFakenewsRepository } from "@/slices/fakenews/repositories";
import { FakenewsData } from "@/slices/fakenews/entities";
import { Query } from "@/application/types";

export type UpdateFakenews = (
    query: Query,
    data: FakenewsData
) => Promise<FakenewsData | null>;
export type UpdateFakenewsSignature = (
    updateFakenews: UpdateFakenewsRepository
) => UpdateFakenews;
export const updateFakenews: UpdateFakenewsSignature =
    (updateFakenewsRepository: UpdateFakenewsRepository) =>
    async (query: Query, data: FakenewsData) => {
        return updateFakenewsRepository.updateFakenews(query, data);
    };
