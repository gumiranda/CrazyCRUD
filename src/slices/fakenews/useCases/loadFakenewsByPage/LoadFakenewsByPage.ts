import { LoadFakenewsByPageRepository } from "@/slices/fakenews/repositories";
import { FakenewsPaginated } from "@/slices/fakenews/entities";
import { Query } from "@/application/types";

export type LoadFakenewsByPage = (query: Query) => Promise<FakenewsPaginated | null>;
export type LoadFakenewsByPageSignature = (
    loadFakenewsByPage: LoadFakenewsByPageRepository
) => LoadFakenewsByPage;
export const loadFakenewsByPage: LoadFakenewsByPageSignature =
    (loadFakenewsByPageRepository: LoadFakenewsByPageRepository) =>
    async (query: Query) => {
        return loadFakenewsByPageRepository.loadFakenewsByPage(query);
    };
