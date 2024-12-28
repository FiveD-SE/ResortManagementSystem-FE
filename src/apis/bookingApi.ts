import { createApi } from '@reduxjs/toolkit/query/react';
import { BOOKING_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';
import { IBookingApiRequest, IBookingApiResponse } from '../types';

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: axiosBaseQuery({
    baseUrl: BOOKING_ENDPOINT,
  }),
  endpoints: (builder) => ({
    getBookings: builder.query<IBookingApiResponse, IBookingApiRequest>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetBookingsQuery } = bookingApi;
