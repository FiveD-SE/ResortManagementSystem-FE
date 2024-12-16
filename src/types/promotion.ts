export interface IPromotion {
  promotionId: string;
  promotionName: string;
  description: string | null;
  discount: number;
  startDate: Date;
  endDate: Date;
}
