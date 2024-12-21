import { IAccount } from './../types/auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_ENDPOINT } from '../constants/endpoints';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_ENDPOINT,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<IAccount, Omit<IAccount, 'id' | 'role' | 'createdAt' | 'updatedAt' | 'status'>>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<IAccount, Omit<IAccount, 'id' | 'name' | 'role' | 'createdAt' | 'updatedAt' | 'status'>>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApi;
