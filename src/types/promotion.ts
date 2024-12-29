export interface IPromotion {
  id: string;
  promotionName: string;
  description: string | null;
  discount: number;
  startDate: Date;
  endDate: Date;
  amount: number;
}

export interface IPromotionApiResponse {
  docs: IPromotion[];
  totalDocs: number;
  page: string;
  limit: string;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: string | null;
  prevPage: string | null;
  pagingCounter: number;
}

export interface IPromotionApiRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}