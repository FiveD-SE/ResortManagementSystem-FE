import { createApi } from '@reduxjs/toolkit/query/react';
import { BOOKING_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';
import { IBookingApiRequest, IBookingApiResponse, IBookingServicesApiResponse } from '../types';

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: axiosBaseQuery({
    baseUrl: BOOKING_ENDPOINT,
  }),
  endpoints: (builder) => ({
    getBookings: builder.query<IBookingApiResponse, IBookingApiRequest>({
      query: (request) => ({
        url: '/',
        method: 'GET',
        params: {
          page: request.page,
          limit: request.limit,
          sortBy: request.sortBy,
          sortOrder: request.sortOrder,
          filter: request.filter,
        },
      }),
    }),
    checkin: builder.mutation<IBookingApiResponse, string>({
      query: (id) => ({
        url: `/${id}/checkin`,
        method: 'PATCH',
      }),
    }),
    checkout: builder.mutation<IBookingApiResponse, string>({
      query: (id) => ({
        url: `/${id}/checkout`,
        method: 'POST',
      }),
    }),
    getBookingsStatusCount: builder.query<{ checkedIn: number; checkedOut: number; pending: number }, void>({
      query: () => ({
        url: '/status-count',
        method: 'GET',
      }),
    }),
    getBookingServices: builder.query<IBookingServicesApiResponse, IBookingApiRequest>({
      query: (request) => ({
        url: `/services/room-based`,
        method: 'GET',
        params: {
          page: request.page,
          limit: request.limit,
          status: request.status,
        },
      }),
    }),
    getBookingServicesCount: builder.query<{ served: number; pending: number }, void>({
      query: () => ({
        url: '/services/status-count',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useCheckinMutation,
  useCheckoutMutation,
  useGetBookingsStatusCountQuery,
  useGetBookingServicesQuery,
  useGetBookingServicesCountQuery,
} = bookingApi;
