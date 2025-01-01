import { createApi } from '@reduxjs/toolkit/query/react';
import { PROMOTION_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';
import { IPromotion, IPromotionApiRequest, IPromotionApiResponse } from '../types/promotion';

export const promotionApi = createApi({
  reducerPath: 'promotionApi',
  baseQuery: axiosBaseQuery({
    baseUrl: PROMOTION_ENDPOINT,
  }),
  endpoints: (builder) => ({
    getPromotions: builder.query<IPromotionApiResponse, IPromotionApiRequest>({
      query: ({ page, limit, sortBy, sortOrder }) => ({
        url: '/',
        method: 'GET',
        params: { page, limit, sortBy, sortOrder },
      }),
      keepUnusedDataFor: 1,
    }),
    deletePromotion: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    createPromotion: builder.mutation<IPromotion, Omit<IPromotion, 'id'>>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        data: {
          promotionName: data.promotionName,
          description: data.description,
          discount: data.discount,
          amount: data.amount,
          startDate: data.startDate,
          endDate: data.endDate,
        },
      }),
    }),
  }),
});

export const { useGetPromotionsQuery, useDeletePromotionMutation, useCreatePromotionMutation } = promotionApi;
