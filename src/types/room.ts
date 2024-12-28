import { RoomStatus } from './enums';

export interface IRoom {
  id: string;
  roomNumber: string;
  roomTypeId: string;
  status: RoomStatus;
  pricePerNight: number;
  createdAt: Date;
  updatedAt: Date;
  images: string[];
}

export interface IRoomType {
  id: string;
  typeName: string;
  description?: string;
  basePrice: number;
  guestAmount: number;
  bedAmount: number;
  bedroomAmount: number;
  sharedBathAmount: number;
  amenities: string[];
  keyFeatures: string[];
}

export interface IRoomApiRequest {
  page: number;
  limit: number;
  sort?: string;
  roomTypeId?: string;
}

export interface IRoomApiResponse {
  totalDocs: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
  totalPages: number | null;
  pagingCounter: number | null;
  docs: IRoom[];
}

export interface IRoomTypeApiRequest {
  page: number;
  limit: number;
  sort?: string;
}

export interface IRoomTypeApiResponse {
  totalDocs: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
  totalPages: number | null;
  pagingCounter: number | null;
  docs: IRoomType[];
}
