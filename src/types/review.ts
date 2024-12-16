export interface IReview {
  reviewId: string;
  customerId: string;
  roomId?: string;
  serviceId?: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}
