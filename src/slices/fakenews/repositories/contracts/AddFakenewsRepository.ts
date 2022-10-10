import { FakenewsData } from "@/slices/fakenews/entities";

export interface AddFakenewsRepository {
    addFakenews(fakenews: FakenewsData): Promise<FakenewsData | null>;
}
