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

export interface IBookingService {
  id: string;
  serviceName: string;
  serviceTypeName: string;
  roomNumber: string;
  checkinDate: Date;
  checkoutDate: Date;
  quantity: number;
  status: string;
  price: number;
}

export interface IBookingApiRequest {
  sortOrder?: 'asc' | 'desc';
  sortBy?: 'checkinDate' | 'checkoutDate' | 'totalAmount' | 'createdAt' | 'status';
  page?: number;
  limit?: number;
  filter?: 'pending' | 'checked in' | 'checked out';
  status?: 'Served' | 'Pending';
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

export interface IBookingServicesApiResponse {
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
  pagingCounter: number | null;
  docs: IBookingService[];
}
