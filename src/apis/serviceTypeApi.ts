import { createApi } from '@reduxjs/toolkit/query/react';
import { SERVICE_TYPE_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';
import { IServiceType, IServiceTypeApiResponse } from '../types';

export const serviceTypeApi = createApi({
    reducerPath: 'serviceTypeApi',
    baseQuery: axiosBaseQuery({
        baseUrl: SERVICE_TYPE_ENDPOINT,
    }),
    endpoints: (builder) => ({
        getServiceTypes: builder.query<IServiceTypeApiResponse, { page: number, limit: number, sort: string }>({
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
        createServiceType: builder.mutation<IServiceType, Omit<IServiceType, 'id' | 'createdAt' | 'updatedAt'>>({
            query: (data) => ({
                url: '/',
                method: 'POST',
                data,
            }),
        }),
        updateServiceType: builder.mutation<IServiceType, Omit<IServiceType, 'createdAt' | 'updatedAt'>>({
            query: (data) => ({
                url: `/${data.id}`,
                method: 'PATCH',
                data: {
                    typeName: data.typeName,
                    description: data.description
                },
            }),
        }),
        deleteServiceType: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetServiceTypesQuery, useCreateServiceTypeMutation, useDeleteServiceTypeMutation, useUpdateServiceTypeMutation } = serviceTypeApi;
