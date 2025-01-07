import { createApi } from '@reduxjs/toolkit/query/react';
import { AUTH_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';
import Cookies from 'js-cookie';
import { loginSuccess } from '../stores/slices/userSlice';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({
    baseUrl: AUTH_ENDPOINT,
  }),

  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ email, password, firstName, lastName, phoneNumber }) => ({
        url: '/register',
        method: 'POST',
        data: {
          email,
          password,
          firstName,
          lastName,
          phoneNumber,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        data: {
          email,
          password,
        },
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          const { accessToken, refreshToken } = data;

          Cookies.set('accessToken', accessToken);
          Cookies.set('refreshToken', refreshToken);
          const result = await dispatch(authApi.endpoints.me.initiate(undefined, { forceRefetch: true }));
          Cookies.set('user', JSON.stringify(result.data));
          dispatch(loginSuccess(result.data));
        } catch (error) {
          console.error('Error during login:', error);
        }
      },
    }),
    me: builder.query({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
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
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: '/email/forgot-password',
        method: 'POST',
        data: {
          email,
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: '/reset-password',
        method: 'POST',
        data: {
          token,
          newPassword,
        },
      }),
    }),
    sendVerifyEmail: builder.mutation({
      query: ({ email }) => ({
        url: '/email/verify-account',
        method: 'POST',
        data: {
          email,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useMeQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSendVerifyEmailMutation,
} = authApi;
