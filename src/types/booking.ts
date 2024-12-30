export interface IRoom {
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

export interface ICustomer {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar: string | null;
  gender: 'male' | 'female';
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface IService {
  serviceId: {
    _id: string;
    serviceName: string;
    descriptin: string;
    serviceTypedId: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    id: string;
  };
  status: string;
  _id: string;
  id: string;
}

export interface IPromotion {
  _id: string;
  promotionName: string;
  description: string;
  discount: number;
  startDate: Date;
  endDate: Date;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface IBooking {
  _id: string;
  roomId: IRoom;
  customerId: ICustomer;
  checkinDate: Date;
  checkoutDate: Date;
  status: string;
  services: IService[];
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
