import { Gender, Role, UserSortBy } from "./enums";

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    avatar: string;
    dob: Date;
    gender: Gender;
    isVerified: boolean;
    isActive: boolean;
    serviceTypeId?: string;
}

export interface IUserApiResponse {
    totalDocs: number;
    page: string;
    limit: string;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: string | null;
    prevPage: string | null;
    pagingCounter: number;
    docs: IUser[];
}

export interface IUserApiRequest {
    role: Role;
    sortOrder: 'asc' | 'desc';
    sortBy: UserSortBy;
    page: number;
    limit: number;
}