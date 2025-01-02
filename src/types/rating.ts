export interface IRating {
  _id: string;
  userId: string;
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
  comment: string;
  roomId: string;
  createdAt: Date;
  updatedAt: Date;
  average: number;
  fullName: string;
}

export interface IRatingApiResquest {
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
  comment: string;
  roomId: string;
}
