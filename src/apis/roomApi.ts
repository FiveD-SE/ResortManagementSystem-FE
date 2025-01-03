import { IRoomApiRequest, IRoomApiResponse, IRoomDetailApiResponse, IRoomFilterApiRequest } from './../types/room';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ROOM_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';
import { IRatingApiResquest } from '../types/rating';

export const roomApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: axiosBaseQuery({
    baseUrl: ROOM_ENDPOINT,
  }),
  endpoints: (builder) => ({
    getRooms: builder.query<IRoomApiResponse, IRoomApiRequest>({
      query: ({ page, limit, sort }) => ({
        url: '/',
        method: 'GET',
        params: { page, limit, sort },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.docs.push(...newItems.docs);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      keepUnusedDataFor: 1,
    }),
    getRoomsByRoomTypeId: builder.query<IRoomApiResponse, IRoomApiRequest>({
      query: ({ roomTypeId, page = 1, limit = 10, sort }) => ({
        url: `/roomType/${roomTypeId}`,
        method: 'GET',
        params: { page, limit, sort },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { roomTypeId, ...rest } = queryArgs;
        return { endpointName, roomTypeId, ...rest };
      },
      merge: (currentCache, newItems) => {
        currentCache.docs.push(...newItems.docs);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getRoomDetailById: builder.query<IRoomDetailApiResponse, string>({
      query: (id) => ({
        url: `/${id}/detail`,
        method: 'GET',
      }),
    }),
    createRoom: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: '/',
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    updateRoom: builder.mutation<void, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: 'PATCH',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    deleteRoom: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    ratingRoom: builder.mutation<void, IRatingApiResquest>({
      query: (request) => ({
        url: `/${request.roomId}/ratings`,
        method: 'POST',
        data: {
          cleanliness: request.cleanliness,
          accuracy: request.accuracy,
          checkIn: request.checkIn,
          communication: request.communication,
          location: request.location,
          value: request.value,
          comment: request.comment,
        },
      }),
    }),
    filter: builder.query<IRoomApiResponse, IRoomFilterApiRequest>({
      query: ({ page, limit, ...rest }) => ({
        url: '/filter',
        method: 'GET',
        params: { page, limit, ...rest },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.docs.push(...newItems.docs);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      keepUnusedDataFor: 3600 * 1000,
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomsByRoomTypeIdQuery,
  useGetRoomDetailByIdQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useLazyGetRoomsQuery,
  useRatingRoomMutation,
  useFilterQuery,
} = roomApi;
export const resetRoomsState = roomApi.util.resetApiState;
