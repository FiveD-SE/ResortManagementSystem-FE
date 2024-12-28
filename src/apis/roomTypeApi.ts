import { IRoomTypeApiResponse, IRoomType } from './../types/room';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ROOM_TYPE_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';

export const roomTypeApi = createApi({
    reducerPath: 'roomTypeApi',
    baseQuery: axiosBaseQuery({
        baseUrl: ROOM_TYPE_ENDPOINT,
    }),
    endpoints: (builder) => ({
        getRoomTypes: builder.query<IRoomTypeApiResponse, void>({
            query: () => ({
                url: '',
                method: 'GET',
            }),
        }),
        postRoomType: builder.mutation<IRoomType, Omit<IRoomType, 'id'>>({
            query: (data) => ({
                url: '',
                method: 'POST',
                data,
            }),
        }),
        patchRoomType: builder.mutation<IRoomType, IRoomType>({
            query: (data) => ({
                url: `/${data.id}`,
                method: 'PATCH',
                data: {
                    typeName: data.typeName,
                    basePrice: data.basePrice,
                    guestAmount: data.guestAmount,
                    bedroomAmount: data.bedroomAmount,
                    bedAmount: data.bedAmount,
                    sharedBathAmount: data.sharedBathAmount,
                    description: data.description,
                    amenities: data.amenities,
                    keyFeatures: data.keyFeatures,
                },
            }),
        }),
        deleteRoomType: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetRoomTypesQuery, usePostRoomTypeMutation, usePatchRoomTypeMutation, useDeleteRoomTypeMutation } = roomTypeApi;
