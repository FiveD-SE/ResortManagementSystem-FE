import { createApi } from '@reduxjs/toolkit/query/react';
import { AUTH_ENDPOINT } from '../constants/endpoints';
import Cookies from 'js-cookie';
import { getUserIdFromToken } from '../utils/tokenUtils';
import { userApi } from './userApi';
import { axiosBaseQuery } from './axiosInstance';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({
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
    changePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: '/change-my-password',
        method: 'POST',
        data: {
          oldPassword,
          newPassword,
        },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log('Password changed successfully!');
        } catch (error) {
          console.error('Failed to change password:', error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useChangePasswordMutation } = authApi;
