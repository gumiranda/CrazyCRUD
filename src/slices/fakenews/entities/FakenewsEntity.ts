export type FakenewsData = {
    _id?: string;
    createdById: string;
    sigiloDe100Anos:boolean;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type FakenewsPaginated = {
    fakenewss: FakenewsData[];
    total: number;
};

export class FakenewsEntity {
    createdById: string;
    sigiloDe100Anos:boolean;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(data: FakenewsData) {
        this.createdById = data.createdById;
        this.sigiloDe100Anos = data.sigiloDe100Anos;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
