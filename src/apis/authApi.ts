import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_ENDPOINT } from '../constants/endpoints';
import Cookies from 'js-cookie';
import { getUserIdFromToken } from '../utils/tokenUtils';
import { userApi } from './userApi';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_ENDPOINT,
  }),

  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ email, password, firstName, lastName }) => ({
        url: '/register',
        method: 'POST',
        body: {
          email,
          password,
          firstName,
          lastName,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          const { accessToken, refreshToken } = data.data;

          Cookies.set('accessToken', accessToken);
          Cookies.set('refreshToken', refreshToken);

          const userID = getUserIdFromToken();

          const user = await dispatch(userApi.endpoints.getUserById.initiate(userID));

          Cookies.set('user', JSON.stringify(user.data.data));
        } catch (error) {
          console.error('Error during login:', error);
        }
      },
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: '/refresh-token',
        method: 'POST',
        body: {
          refreshToken,
        },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;

        Cookies.set('accessToken', data.data.accessToken);
        Cookies.set('refreshToken', data.data.refreshToken);
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
