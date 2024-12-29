import { RoomStatus } from './enums';
import { IRating } from './rating';

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
export interface IRoomDetailApiResponse {
  room: IRoom;
  roomType: IRoomType;
  ratings: IRating[];
  averageScores: {
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
  };
  ratingCount: number;
  ratingCounts: {
    oneStar: number;
    twoStars: number;
    threeStars: number;
    fourStars: number;
    fiveStars: number;
  };
}
