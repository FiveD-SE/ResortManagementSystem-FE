import { createApi } from '@reduxjs/toolkit/query/react';
import { USER_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery({
    baseUrl: USER_ENDPOINT,
  }),

  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => ({ url: `/${id}` }),
    }),
    changeAvatar: builder.mutation({
      query: (formData) => ({
        url: `/change-avatar`,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    changeProfile: builder.mutation({
      query: ({ firstName, lastName }: { firstName: string; lastName: string }) => ({
        url: `/change-profile`,
        method: 'PATCH',
        data: {
          firstName,
          lastName,
        },
      }),
    }),
  }),
});

export const { useGetUserByIdQuery, useChangeAvatarMutation, useChangeProfileMutation } = userApi;
