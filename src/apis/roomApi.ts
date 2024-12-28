import { IRoomApiResponse } from './../types/room';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ROOM_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';

export const roomApi = createApi({
    reducerPath: 'roomApi',
    baseQuery: axiosBaseQuery({
        baseUrl: ROOM_ENDPOINT,
    }),
    endpoints: (builder) => ({
        getRooms: builder.query<IRoomApiResponse, void>({
            query: () => ({
                url: '',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetRoomsQuery } = roomApi;
