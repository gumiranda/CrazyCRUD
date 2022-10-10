import { Query } from "@/application/types";
import { FakenewsData } from "@/slices/fakenews/entities";

export interface DeleteFakenewsRepository {
    deleteFakenews(query: Query): Promise<FakenewsData | null>;
}
