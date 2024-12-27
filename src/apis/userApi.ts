import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_ENDPOINT } from '../constants/endpoints';
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: USER_ENDPOINT,
  }),

  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetUserByIdQuery } = userApi;
