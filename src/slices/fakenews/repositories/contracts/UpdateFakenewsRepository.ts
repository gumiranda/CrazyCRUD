import { Query } from "@/application/types";
import { FakenewsData } from "@/slices/fakenews/entities";

export interface UpdateFakenewsRepository {
    updateFakenews(query: Query, data: FakenewsData): Promise<FakenewsData | null>;
}
