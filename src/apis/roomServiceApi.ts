import { IRoomServiceApiResponse, IRoomServiceApiRequest, IRoomService } from "../types/roomService";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ROOM_SERVICE_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';

export const roomServiceApi = createApi({
    reducerPath: 'roomServiceApi',
    baseQuery: axiosBaseQuery({
        baseUrl: ROOM_SERVICE_ENDPOINT,
    }),
    endpoints: (builder) => ({
        getRoomServices: builder.query<IRoomServiceApiResponse, IRoomServiceApiRequest>({
            query: ({ page, limit, sortBy, sortOrder }) => ({
                url: '/',
                method: 'GET',
                params: { page, limit, sortBy, sortOrder },
            }),
        }),
        createRoomService: builder.mutation<IRoomService, Omit<IRoomService, 'id'>>({
            query: (data) => ({
                url: '/',
                method: 'POST',
                data: {
                    serviceName: data.serviceName,
                    description: data.description,
                    price: data.price,
                },
            }),
        }),
        updateRoomService: builder.mutation<IRoomService, IRoomService>({
            query: (data) => ({
                url: `/${data.id}`,
                method: 'PATCH',
                data: {
                    serviceName: data.serviceName,
                    description: data.description,
                    price: data.price,
                },
            }),
        }),
        deleteRoomService: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetRoomServicesQuery,
    useCreateRoomServiceMutation,
    useUpdateRoomServiceMutation,
    useDeleteRoomServiceMutation,
} = roomServiceApi;