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
        getServices: builder.query<IServiceApiResponse, { page: number, limit: number, sort: string }>({
            query: ({ page, limit, sort }) => ({
                url: '/',
                method: 'GET',
                params: {
                    page,
                    limit,
                    sort,
                },
            }),
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
    }),
});

export const { useGetServicesQuery, useEditServiceMutation, useDeleteServiceMutation, useCreateServiceMutation, useUpdateServiceMutation } = serviceApi;
