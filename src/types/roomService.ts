export interface IRoomServiceApiResponse {
    docs: IRoomService[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: null;
    nextPage: null;
}

export interface IRoomService {
    _id: string;
    roomServiceId: string;
    serviceName: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    id: string;
}

export interface IRoomServiceApiRequest {
    sortOrder?: string;
    sortBy?: string;
    page?: number;
    limit?: number;
}