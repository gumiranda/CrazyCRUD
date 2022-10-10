import { Query } from "@/application/types";
import { FakenewsData } from "@/slices/fakenews/entities";

export interface LoadFakenewsRepository {
    loadFakenews(query: Query): Promise<FakenewsData | null>;
}
