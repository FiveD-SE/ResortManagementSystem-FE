import { createApi } from '@reduxjs/toolkit/query/react';
import { USER_ENDPOINT, ADMIN_USER_ENDPOINT } from '../constants/endpoints';
import { IUser, IUserApiRequest, IUserApiResponse } from '../types/user';
import { axiosBaseQuery } from './axiosInstance';
import { Role } from '../types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery({
    baseUrl: USER_ENDPOINT,
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<
      any,
      { firstName: string; lastName: string; email: string; password: string; role: Role; serviceTypeId: string }
    >({
      query: (body) => ({
        url: '/',
        method: 'POST',
        data: body,
      }),
    }),
    getUserById: builder.query<IUser, string>({
      query: (id) => ({ url: `/${id}` }),
    }),
    changeAvatar: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `/change-avatar`,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    changeProfile: builder.mutation<any, { firstName: string; lastName: string; phoneNumber: string }>({
      query: ({ firstName, lastName, phoneNumber }) => ({
        url: `/change-profile`,
        method: 'PATCH',
        data: {
          firstName,
          lastName,
          phoneNumber,
        },
      }),
    }),
  }),
});

export const adminUserApi = createApi({
  reducerPath: 'adminUserApi',
  baseQuery: axiosBaseQuery({
    baseUrl: ADMIN_USER_ENDPOINT,
  }),
  endpoints: (builder) => ({
    adminGetUsersByRole: builder.query<IUserApiResponse, IUserApiRequest>({
      query: (params) => ({
        url: `/${params.role}`,
        method: 'GET',
        params: {
          sortOrder: params.sortOrder,
          sortBy: params.sortBy,
          page: params.page,
          limit: params.limit,
        },
      }),
    }),
    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    updateUser: builder.mutation<
      any,
      Omit<IUser, 'avatar' | 'dob' | 'gender' | 'isVerified' | 'isActive' | 'email'> & { id: string }
    >({
      query: (data) => ({
        url: `/${data.id}`,
        method: 'PATCH',
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role,
          serviceTypeId: data.serviceTypeId,
        },
      }),
    }),
    getStaffStatistic: builder.query<{ total: number; receptionist: number; service_staff: number }, void>({
      query: () => ({
        url: '/staff-count',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUserByIdQuery, useCreateUserMutation, useChangeAvatarMutation, useChangeProfileMutation } = userApi;

export const { useAdminGetUsersByRoleQuery, useDeleteUserMutation, useUpdateUserMutation, useGetStaffStatisticQuery } =
  adminUserApi;
