import { ICustomer } from './customer';
import { IPromotion } from './promotion';
import { IBookingRoom } from './room';
import { IBookingService } from './service';

export interface IBooking {
  _id: string;
  roomId: IBookingRoom;
  customerId: ICustomer;
  checkinDate: Date;
  checkoutDate: Date;
  status: string;
  services: IBookingService[];
  promotionId: IPromotion;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface IBookingApiRequest {
  sortOrder?: 'asc' | 'desc';
  sortBy?: 'checkinDate' | 'checkoutDate' | 'totalAmount' | 'createdAt' | 'status';
  page?: number;
  limit?: number;
  filter?: 'pending' | 'checked in' | 'checked out';
}

export interface IBookingApiResponse {
  page: number;
  limit: number;
  totalDocs: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
  totalPages: number | null;
  pagingCounter: number | null;
  docs: IBooking[];
}
