import { Repository } from "@/application/infra/contracts/repository";
import { FakenewsData, FakenewsPaginated } from "@/slices/fakenews/entities";
import {
    AddFakenewsRepository,
    DeleteFakenewsRepository,
    LoadFakenewsByPageRepository,
    LoadFakenewsRepository,
    UpdateFakenewsRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class FakenewsRepository
    implements
        AddFakenewsRepository,
        DeleteFakenewsRepository,
        LoadFakenewsByPageRepository,
        LoadFakenewsRepository,
        UpdateFakenewsRepository
{
    constructor(private readonly repository: Repository) {}
    async addFakenews(fakenews: FakenewsData): Promise<FakenewsData | null> {
        return this.repository.add(fakenews);
    }
    async deleteFakenews(query: Query): Promise<FakenewsData | null> {
        return this.repository.deleteOne(query?.fields);
    }
    async loadFakenewsByPage(query: Query): Promise<FakenewsPaginated | null> {
        const fakenewss = await this.repository.getPaginate(
            query?.options?.page ?? 0,
            query?.fields ?? {},
            query?.options?.sort ?? { createdAt: -1 },
            10,
            query?.options?.projection ?? {}
        );
        const total = await this.repository.getCount(query?.fields ?? {});
        return { fakenewss, total };
    }
    async loadFakenews(query: Query): Promise<FakenewsData | null> {
        return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
    }
    async updateFakenews(query: Query, data: FakenewsData): Promise<FakenewsData | null> {
        return this.repository.update(query?.fields ?? {}, data);
    }
}
