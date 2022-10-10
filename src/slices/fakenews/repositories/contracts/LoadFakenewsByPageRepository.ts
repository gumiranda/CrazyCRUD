import { Query } from "@/application/types";
import { FakenewsPaginated } from "@/slices/fakenews/entities";

export interface LoadFakenewsByPageRepository {
    loadFakenewsByPage(query: Query): Promise<FakenewsPaginated | null>;
}
