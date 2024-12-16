import { RoomStatus } from './enums';

export interface IRoom {
  roomId: string;
  roomNumber: string;
  roomTypeId: string;
  status: RoomStatus;
  pricePerNight: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoomType {
  roomTypeId: string;
  typeName: string;
  description?: string;
  basePrice: number;
  guestAmount: number;
}
