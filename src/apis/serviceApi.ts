import { createApi } from '@reduxjs/toolkit/query/react';
import { SERVICE_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';
import { IService, IServiceApiResponse } from '../types';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: axiosBaseQuery({
    baseUrl: SERVICE_ENDPOINT,
  }),
  endpoints: (builder) => ({
    getServices: builder.query<IServiceApiResponse, { page: number; limit: number; sort: string }>({
      query: ({ page, limit, sort }) => ({
        url: '/',
        method: 'GET',
        params: {
          page,
          limit,
          sort,
        },
      }),
      keepUnusedDataFor: 1,
    }),
    editService: builder.mutation<IService, IService>({
      query: (data) => ({
        url: `/${data.id}`,
        method: 'POST',
        body: {
          serviceName: data.serviceName,
          description: data.description,
          serviceTypeId: data.serviceTypeId,
          price: data.price,
        },
      }),
    }),
    deleteService: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    createService: builder.mutation<IService, Omit<IService, 'id' | 'createdAt' | 'updatedAt'>>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        data,
      }),
    }),
    updateService: builder.mutation<IService, Omit<IService, 'createdAt' | 'updatedAt'>>({
      query: (data) => ({
        url: `/${data.id}`,
        method: 'PATCH',
        data: {
          serviceName: data.serviceName,
          description: data.description,
          serviceTypeId: data.serviceTypeId,
          price: data.price,
        },
      }),
    }),
    getServiceByRoomType: builder.query<
      IServiceApiResponse,
      { roomTypeId: string; page: number; limit: number; sortBy: string; sortOrder: string }
    >({
      query: ({ roomTypeId, page, limit, sortBy, sortOrder }) => ({
        url: `/room-type/${roomTypeId}`,
        method: 'GET',
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
        },
      }),
      keepUnusedDataFor: 1,
    }),
  }),
});

export const {
  useGetServicesQuery,
  useEditServiceMutation,
  useDeleteServiceMutation,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useGetServiceByRoomTypeQuery,
} = serviceApi;
