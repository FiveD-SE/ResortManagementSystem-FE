import { BookingStatus } from './enums';

export interface IBooking {
  bookingId: string;
  customerId: string;
  totalAmount: number;
  checkInDate: Date;
  checkOutDate: Date;
  bookingStatus: BookingStatus;
  roomId: string;
  serviceId?: string;
  promotionId?: string;
  createdAt: Date;
}
