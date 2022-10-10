import { DeleteFakenewsRepository } from "@/slices/fakenews/repositories";
import { FakenewsData } from "@/slices/fakenews/entities";
import { Query } from "@/application/types";

export type DeleteFakenews = (query: Query) => Promise<FakenewsData | null>;
export type DeleteFakenewsSignature = (
    deleteFakenews: DeleteFakenewsRepository
) => DeleteFakenews;
export const deleteFakenews: DeleteFakenewsSignature =
    (deleteFakenewsRepository: DeleteFakenewsRepository) => (query: Query) => {
        return deleteFakenewsRepository.deleteFakenews(query);
    };
