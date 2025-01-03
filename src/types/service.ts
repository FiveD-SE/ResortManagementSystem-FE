export interface IService {
  id: string;
  serviceName: string;
  description: string | null;
  serviceTypeId: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IServiceType {
  id: string;
  typeName: string;
  description: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface IServiceApiResponse {
  page: number;
  limit: number;
  totalDocs: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
  totalPages: number;
  pagingCounter: number;
  docs: IService[];
}

export interface IServiceTypeApiResponse {
  page: number;
  limit: number;
  totalDocs: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
  totalPages: number;
  pagingCounter: number;
  docs: IServiceType[];
}

export interface IBookingService {
  serviceId: {
    _id: string;
    serviceName: string;
    description: string;
    serviceTypedId: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    id: string;
  };
  _id: string;
  id: string;
  serviceTypeName: string;
  roomNumber: string;
  checkinDate: string;
  checkoutDate: string;
  quantity: number;
  status: string;
  price: number;
}
