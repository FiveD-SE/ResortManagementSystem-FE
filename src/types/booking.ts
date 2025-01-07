import { ICustomer } from './customer';
import { PaymentMethod } from './enums';
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
  paymentMethod: string;
  guests: {
    adults: number;
    children: number;
    id: string;
  };
  invoice: {
    checkoutUrl: string;
  };
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

export interface ITripResponse {
  docs: ITrip[];
  totalDocs: number;
  page: number;
  limit: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface ITripRequest {
  userId: string;
  filter?: 'upcoming' | 'past' | 'staying';
  sortOrder?: 'asc' | 'desc';
  sortBy?: 'checkinDate' | 'checkoutDate' | 'totalAmount' | 'createdAt' | 'status';
  page?: number;
  limit?: number;
}

export interface ITrip {
  paidAmount: number;
  _id: string;
  roomId: {
    _id: string;
    roomNumber: string;
    roomTypeId: string;
    status: string;
    pricePerNight: number;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    averageRating: number;
    id: string;
  };
  customerId: string;
  checkinDate: Date;
  checkoutDate: Date;
  status: string;
  services: IBookingService[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface ICreateBookingRequest {
  checkinDate: Date;
  checkoutDate: Date;
  guests: {
    adults: number;
    children: number;
  };
  servicesWithQuantities: {
    serviceId: string;
    quantity: number;
  }[];
  promotionId: string;
  paymentMethod: PaymentMethod;
}
