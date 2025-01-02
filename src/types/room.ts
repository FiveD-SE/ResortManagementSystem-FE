import { Dayjs } from 'dayjs';
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
  docs: (IRoom & {
    nextAvailableWeek: {
      start: string;
      end: string;
    };
  })[];
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
  occupiedDates: { checkinDate: Dayjs; checkoutDate: Dayjs }[];
}

export interface IBookingRoom {
  _id: string;
  roomNumber: string;
  roomTypeId: {
    _id: string;
    typeName: string;
    id: string;
  };
  status: string;
  pricePerNight: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  averageRating: number;
  ratings: string[];
  id: string;
}

export interface IRoomFilterApiRequest {
  guestAmount?: number;
  bedAmount?: number;
  bedroomAmount?: number;
  searchKeyFeature?: string;
  sortBy?: string;
  sortOrder?: string;
  checkinDate?: string;
  checkoutDate?: string;
  roomTypeId?: string;
  limit: number;
  page: number;
  amenities?: string[];
}
